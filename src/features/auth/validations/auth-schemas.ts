import { z } from "zod";

// Login Schema
export const loginSchema = z.object({
  email: z.email({ pattern: z.regexes.email }),
  password: z.string("Please enter your password"),
});

// Register Schema
export const registerSchema = z
  .object({
    email: z.email({ pattern: z.regexes.email }),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(20, "Password must be less than 20 characters")
      .regex(/[a-z]/, "Password must contain atleast one lowercase")
      .regex(/[A-Z]/, "Password must contain atleast one uppercase")
      .regex(/[0-9]/, "Password must contain atleast one number")
      .regex(/[^a-zA-Z0-9]/, "Password must contain at least one special character"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// Reset password schema
export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(20, "Password must be less than 20 characters")
      .regex(/[a-z]/, "Password must contain atleast one lowercase")
      .regex(/[A-Z]/, "Password must contain atleast one uppercase")
      .regex(/[0-9]/, "Password must contain atleast one number")
      .regex(/[^a-zA-Z0-9]/, "Password must contain at least one special character"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
