import { z } from "zod";
import { CreatePlaceholderRequest } from "./schema";
import { ActionState } from "@/lib/create-safe-action";

export type InputType = z.infer<typeof CreatePlaceholderRequest>;
export type OutputType = ActionState<InputType, Placeholder>;

export type Placeholder = {
  id: number;
  title: string;
  body: string;
  userId: number;
};
