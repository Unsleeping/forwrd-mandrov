import { z, ZodEffects, ZodString } from "zod";
import { formSchema, userSchema } from "./schemas";

export type User = z.infer<typeof userSchema>;

export type FormType = z.infer<typeof formSchema>;

export type UserData = {
  id: string;
  name: string;
  country: string;
  email: string;
  phone: string;
};

export type ZodSchemasType = ZodString | ZodEffects<ZodString, string, string>;
