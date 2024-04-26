import NextAuth, { AuthOptions, User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { isBefore } from "date-fns";
import { jwtDecode, JwtPayload } from "jwt-decode";

type KeycloakPayload = JwtPayload & {
  email: string;
  preferred_username: string;
  email_verified: boolean;
};

const nextAuthOptions = {
  pages: {
    signIn: "/login",
    error: "/error",
  },
  providers: [
    Credentials({
      id: "kyc-custom-credentials",
      name: "kyc-custom-credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const res = await fetch(
          `${process.env.KEYCLOAK_ISSUER}/protocol/openid-connect/token`,
          {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
              grant_type: "password",
              username: credentials!.username,
              password: credentials!.password,
              client_id: process.env.KEYCLOAK_ID!,
              client_secret: process.env.KEYCLOAK_SECRET!,
              scope: "openid",
            }),
          }
        );

        const tokens = await res.json();

        if (tokens && tokens.access_token) {
          return {
            accessToken: tokens.access_token,
            refreshToken: tokens.refresh_token,
            idToken: tokens.id_token,
          } as User;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn() {
      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user?.accessToken;
        token.refreshToken = user?.refreshToken;
        token.idToken = user?.idToken;
      }

      const parsedTokenExp = new Date((token as any)?.exp);

      // If token is expired, return do refresh token
      if (isBefore(new Date(), parsedTokenExp)) {
        // Access token has expired, try to update it
        // const updatedToken = await refreshAccessToken(token);
        return token;
      }

      return token;
    },
    async session({ session, token }) {
      const { idToken, accessToken } = token;
      const payload = jwtDecode<KeycloakPayload>(String(idToken));

      const sessionWithUser = {
        ...session,
        accessToken,
        user: {
          email: payload.email,
          name: payload.preferred_username,
          emailVerified: payload.email_verified,
        },
      };

      return sessionWithUser;
    },
  },
} as AuthOptions;

const handler = NextAuth(nextAuthOptions);
export { handler as GET, handler as POST, nextAuthOptions };
