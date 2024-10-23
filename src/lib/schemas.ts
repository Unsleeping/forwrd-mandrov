import { z } from "zod";
import countries from "@/data/countries.json";

export const nameSchema = z
  .string()
  .min(1, "Name is required")
  .regex(/^[\p{L}\s'-]+$/u, "Name should only include letters");

export const emailSchema = z
  .string()
  .min(1, "Email is required")
  .refine(
    (email) => email.split("@").length === 2,
    "Email must contain exactly one '@' character"
  );

export const phoneSchema = z
  .string()
  .min(1, "Phone is required")
  .regex(/^\+[^+]*$/, "Phone must start with '+' and contain only one '+'");

export const userSchema = z.object({
  originalId: z.string(),
  name: nameSchema,
  country: z.enum(countries as [string, ...string[]], {
    required_error: "Country is required",
  }),
  email: emailSchema,
  phone: phoneSchema,
});

const usersSchema = z.array(userSchema);

export const formSchema = z.object({
  users: usersSchema,
});
