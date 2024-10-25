import { z, ZodEffects, ZodString } from "zod";
import { formSchema, userSchema } from "./schemas";

export type User = z.infer<typeof userSchema>;

export type FormType = z.infer<typeof formSchema>;

export type UserData = User[];

type WithValidation<T> = {
  value: T;
  isEmpty: boolean;
  isInvalid: boolean;
};

type WithValidationFields<T, K extends keyof T> = Omit<T, K> & {
  [P in K]: WithValidation<T[P]>;
};

type UserFields = Pick<User, "id" | "country"> &
  WithValidationFields<User, "name" | "email" | "phone">;

export type ZodSchemasType = ZodString | ZodEffects<ZodString, string, string>;

export type NormalizedUserData = {
  users: {
    byId: Record<string, UserFields>;
    allIds: string[];
  };
  countries: {
    byId: Record<string, { id: string; name: string }>;
    allIds: string[];
  };
};
