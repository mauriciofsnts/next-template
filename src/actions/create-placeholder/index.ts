"use server";

import { createSafeAction } from "@/lib/create-safe-action";
import { revalidatePath } from "next/cache";
import { CreatePlaceholderRequest } from "./schema";
import { InputType, OutputType, Placeholder } from "./types";
import { client } from "@/lib/http/axios";

const handler = async (data: InputType): Promise<OutputType> => {
  let item;

  try {
    const response = await client.request<InputType, Placeholder>({
      url: "/posts",
      method: "POST",
      data: data,
    });

    item = response.body;
  } catch (error) {
    return {
      error: (error as any).message || "Erro ao criar placeholder",
    };
  }

  if (!item) return { error: "Erro ao criar placeholder" };

  revalidatePath("/posts");
  return { data: item };
};

export const createPlaceholder = createSafeAction(
  CreatePlaceholderRequest,
  handler
);
