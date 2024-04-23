import { z } from "zod";

export type FieldErrors<T> = {
  [K in keyof T]?: string[];
};

export type ActionState<T, O> = {
  fieldErrors?: FieldErrors<T>;
  error?: string | null;
  data?: O;
};

export const createSafeAction = <T, O>(
  schema: z.Schema<T>,
  handler: (validationData: T) => Promise<ActionState<T, O>>
) => {
  return async (data: T): Promise<ActionState<T, O>> => {
    const result = schema.safeParse(data);
    if (!result.success) {
      return {
        fieldErrors: result.error.flatten().fieldErrors as FieldErrors<T>,
      };
    }

    return handler(result.data);
  };
};
