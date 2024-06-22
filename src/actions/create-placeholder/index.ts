"use server";

import { POST } from "@/lib/http/handlers";
import { authedProcedure } from "@/lib/http/procedure";

import { InputType, Placeholder } from "./types";
import { CreatePlaceholderRequest } from "./schema";

export const createPlaceholder = authedProcedure
  .createServerAction()
  .input(CreatePlaceholderRequest)
  .handler(async ({ ctx, input }) => {
    const headers = { Authorization: `Bearer ${ctx.token}` };
    const ROUTE = "/posts";
    return await POST<InputType, Placeholder>(ROUTE, input, headers);
  });
