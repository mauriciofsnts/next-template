import NextAuth, { AuthOptions, User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { jwtDecode, JwtPayload } from "jwt-decode";

type KeycloakPayload = JwtPayload & { email: string };

const nextAuthOptions = {
  pages: {
    signIn: "/login", // path the page here
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
          } as any as User;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = (user as any).accessToken;
        token.refreshToken = (user as any).refreshToken;
        token.idToken = (user as any).idToken;
      }

      // Return previous token if the access token has not expired yet
      // if (Date.now() < token.accessTokenExpires) {
      return token;
      // }

      // Access token has expired, try to update it
      // return refreshAccessToken(token);
    },
    async session({ session, token }) {
      const { idToken, accessToken } = token;
      const payload = jwtDecode<KeycloakPayload>(idToken as string);

      (session as any).accessToken = accessToken;
      (session as any).user = {
        ...session.user,
        email: payload.email,
      };

      return session;
    },
  },
} as AuthOptions;

const handler = NextAuth(nextAuthOptions);
export { handler as GET, handler as POST, nextAuthOptions };
