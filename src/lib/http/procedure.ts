import { auth } from "@/lib/auth/auth";
import { ZSAError, createServerActionProcedure } from "zsa";
import { HttpError } from "./http-definitions";

export const authedProcedure = createServerActionProcedure()
  .experimental_shapeError(({ err }) => {
    return err as HttpError;
  })
  .handler(async () => {
    try {
      const session = await auth();

      if (session && session.accessToken) {
        return { token: session.accessToken };
      }

      throw new ZSAError(
        "NOT_AUTHORIZED",
        "You are not authorized to perform this action"
      );
    } catch {
      throw new ZSAError(
        "NOT_AUTHORIZED",
        "You are not authorized to perform this action"
      );
    }
  });
