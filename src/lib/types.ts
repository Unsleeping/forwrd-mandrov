import { z, ZodEffects, ZodString } from "zod";
import { formSchema, userSchema } from "./schemas";

export type User = z.infer<typeof userSchema>;

export type FormType = z.infer<typeof formSchema>;

export type AwesomeData = {
  normalizedData: NormalizedUserData;
  originalData: User[];
};

export type ZodSchemasType = ZodString | ZodEffects<ZodString, string, string>;

export type NormalizedUserData = {
  users: {
    byId: Record<string, User>;
    allIds: string[];
  };
  countries: {
    byId: Record<string, { id: string; name: string }>;
    allIds: string[];
  };
};
