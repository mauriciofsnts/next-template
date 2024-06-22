import { AuthOptions, User, getServerSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { jwtDecode, JwtPayload } from "jwt-decode";
import {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import { KycUser } from "./next-auth";

type KeycloakPayload = JwtPayload & {
  email: string;
  preferred_username: string;
  email_verified: boolean;
  realm_access: { roles: string[] };
};

const getPayloadFromAccessToken = (accessToken: string): KeycloakPayload => {
  return jwtDecode<KeycloakPayload>(String(accessToken));
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
              client_id: process.env.KEYCLOAK_CLIENT_ID!,
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
  events: {
    signOut: async ({ token }) => {
      const logOutUrl = new URL(
        `${process.env.KEYCLOAK_ISSUER}/protocol/openid-connect/logout`
      );

      logOutUrl.searchParams.set("id_token_hint", (token as any).idToken);
      await fetch(logOutUrl);
    },
  },
  callbacks: {
    async signIn() {
      return true;
    },

    async jwt(params) {
      if (params.trigger === "update") {
        // Triggerd by `update` function in `session` callback
        if (params.session?.request) {
          // If the session has a `request` property, it means the user just verified their email
          if (params.session.request === "REFRESH_USER_PROFILE") {
            let session = params.session;
            session.user.emailVerified = true;

            return {
              // Keep the previous token properties
              ...params.token,
              ...session,
            };
          }
        }
      }

      if (params.user) {
        // First login, save the `access_token`, `refresh_token`, and other details into the JWT
        // So we consider the user as authenticated and not need to refresh the token
        const { accessToken, refreshToken, idToken } = params.user;
        const parsedAccessToken = getPayloadFromAccessToken(accessToken);
        const roles = parsedAccessToken.realm_access?.roles ?? [];

        const profile: KycUser = {
          email: parsedAccessToken.email,
          emailVerified: parsedAccessToken.email_verified,
          name: parsedAccessToken.preferred_username,
          roles: roles,
        };

        return {
          access_token: accessToken,
          idToken: idToken,
          refresh_token: refreshToken,
          expires_at: params.user.expires_at,
          user: profile,
        };
      }
      // Subsequent logins, if the `access_token` is still valid, return the JWT
      else if (Date.now() < (params.token as any).expires_at * 1000) {
        // Subsequent logins, if the `access_token` is still valid, return the JWT
        return params.token;
      } else {
        // Subsequent logins, if the `access_token` has expired, try to refresh it
        if (!params.token.refresh_token)
          throw new Error("Missing refresh token");

        try {
          // The `token_endpoint` can be found in the provider's documentation. Or if they support OIDC,
          // at their `/.well-known/openid-configuration` endpoint.
          // i.e. https://accounts.google.com/.well-known/openid-configuration
          const response = await fetch(
            `${process.env.KEYCLOAK_ISSUER}/protocol/openid-connect/token`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
              body: new URLSearchParams({
                grant_type: "refresh_token",
                refresh_token: params.token.refresh_token! as string,
                client_id: process.env.KEYCLOAK_CLIENT_ID!,
                client_secret: process.env.KEYCLOAK_CLIENT_SECRET!,
              }),
            }
          );

          const responseTokens = await response.json();
          if (!response.ok) {
            throw new Error("responseTokens.error");
          }

          return {
            // Keep the previous token properties
            ...params.token,
            access_token: responseTokens.access_token,
            expires_at: Math.floor(
              Date.now() / 1000 + (responseTokens.expires_in as number)
            ),
            // Fall back to old refresh token, but note that
            // many providers may only allow using a refresh token once.
            refresh_token:
              responseTokens.refresh_token ?? params.token.refresh_token,
          };
        } catch (error) {
          if (params.session.error)
            params.session.error = "RefreshAccessTokenError";

          return { ...params.token, error: "RefreshAccessTokenError" as const };
        }
      }
    },

    async session({ session, token, user }) {
      if (user || token?.user) {
        const profile = token.user ?? user;
        session.user = profile as any;
        session.accessToken = token.access_token as string;
      }
      return session;
    },
  },
} as AuthOptions;

function auth(
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, nextAuthOptions);
}

export { auth, nextAuthOptions };
