import { z } from "zod";

export const signInSchema = z.object({
  email: z
    .email("Please enter a valid email address")
    .trim()
    .min(1, "Email is required"),

  password: z
    .string()
    .trim()
    .min(8, "Password must be at least 8 characters")
    .max(50, "Password must not exceed 50 characters"),
});

export type SignInFormValues = z.infer<typeof signInSchema>;
