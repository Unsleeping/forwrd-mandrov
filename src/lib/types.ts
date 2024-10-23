import { z, ZodEffects, ZodString } from "zod";
import { formSchema, userSchema } from "./schemas";

export type User = z.infer<typeof userSchema>;

export type FormType = z.infer<typeof formSchema>;

type UserData = {
  // this one will be replaced with useFieldArray
  id: string;
  name: string;
  country: string;
  email: string;
  phone: string;
  originalId: string;
};

export type AwesomeData = {
  normalizedData: NormalizedUserData;
  originalData: PopulatedUserData[];
};

export type PopulatedUserData = Omit<UserData, "id">;

export type ZodSchemasType = ZodString | ZodEffects<ZodString, string, string>;

export type NormalizedUserData = {
  users: {
    byOriginalId: Record<string, PopulatedUserData>;
    allOriginalIds: string[];
  };
  countries: {
    byOriginalId: Record<string, { originalId: string; name: string }>;
    allOriginalIds: string[];
  };
};
