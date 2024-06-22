import { DefaultUser, JWT } from "next-auth";
import type { Roles } from "../guards/abilities";

type KycUser = {
  email: string;
  emailVerified: boolean;
  name: string;
  roles: Roles[];
};

declare module "next-auth" {
  interface Session {
    accessToken: string;
    refreshToken: string;
    user?: KycUser;
    error?: "RefreshAccessTokenError";
  }
  interface User extends KycUser {
    accessToken: string;
    refreshToken: string;
    idToken: string;
    expires_at: number;
    tokenIssuer: string;
  }
  interface JWT extends JWT {
    exp: number;
  }
}
