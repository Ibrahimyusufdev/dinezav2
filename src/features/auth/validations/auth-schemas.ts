import { z } from "zod";
import { phoneSchema } from "@/shared/helpers/formatPhoneNumber";

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

// Diner User data schema for onboarding
export const dinerOnboardSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phoneNumber: phoneSchema,
  preferredDiningLocations: z.array(z.string().min(1, "Please select atleast 1 location")),
  agreeToTerms: z.boolean().refine((val) => val === true, {
    message: "Please accept the terms and condition",
  }),
});

// Restaurant User data schema for onboarding
export const restaurantOnboardSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  restaurantName: z.string().min(1, "Restaurant name is required"),
  businessEmail: z.email({ pattern: z.regexes.email }),
  contactName: z.string().min(1, "Contact Person Name is required"),
  contactPhone: phoneSchema,
  address: z.string().min(5),
  cuisineType: z.array(z.string().min(1, "Please select atleast 1 cuisine")),
  agreeToTerms: z.boolean().refine((val) => val === true, {
    message: "Please accept the terms and condition",
  }),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
export type DinerOnboardData = z.infer<typeof dinerOnboardSchema>
export type RestaurantOnboardData = z.infer<typeof restaurantOnboardSchema>