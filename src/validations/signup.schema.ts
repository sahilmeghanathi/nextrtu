import { z } from "zod";

export const signUpSchema = z
  .object({
    fullName: z.string().min(2, "Full name must be at least 2 characters"),

    email: z.email("Please enter a valid email address").trim().min(1, "Email is required"),

    password: z.string().min(8, "Password must be at least 8 characters"),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export type SignUpFormValues = z.infer<typeof signUpSchema>;
