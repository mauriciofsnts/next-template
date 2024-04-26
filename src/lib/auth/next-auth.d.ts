import { DefaultUser, JWT } from "next-auth";
declare module "next-auth" {
  interface Session {
    user?: DefaultUser & {
      accessToken: string;
      refreshToken: string;
      idToken?: string;
    };
  }
  interface User extends DefaultUser {
    accessToken: string;
    refreshToken: string;
    idToken?: string;
  }
  interface JWT extends JWT {
    exp: number;
  }
}
