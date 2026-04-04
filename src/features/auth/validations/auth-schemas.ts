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

// Diner User data schema
// export const registerDinerSchema = z
//   .object({
//     firstName: z.string().min(1, "First name is required"),
//     lastName: z.string().min(1, "Last name is required"),
//     email: z.email({ pattern: z.regexes.email }),
//     password: z
//       .string()
//       .min(8, "Password must be atleast 8 characters")
//       .max(20, "Password must be less than 20 characters")
//       .regex(/[a-z]/, "Password must contained atleast one lowercase")
//       .regex(/[A-Z]/, "Password must contained atleast one uppercase")
//       .regex(/[0-9]/, "Password must contained atleast one number")
//       .regex(/[^a-zA-Z0-9]/, "Password must contained at least one special character"),
//     confirmPassword: z.string(),
//     phoneNumber: phoneSchema,
//     preferredDiningLocations: z.array(z.string().min(1, "Please select atleast 1 location")),
//     avatar: z.any().optional(),
//     agreeToTerms: z.boolean().refine((val) => val === true, {
//       message: "Please accept the terms and condition",
//     }),
//   })
//   .refine((data) => data.password === data.confirmPassword, {
//     message: "Passwords do not match",
//     path: ["confirmPassword"], // error appears on this field
//   });

// Restuarant User data s
// export const registerRestaurantSchema = z
//   .object({
//     firstName: z.string().min(1, "First name is required"),
//     lastName: z.string().min(1, "Last name is required"),
//     email: z.email({ pattern: z.regexes.email }),
//     password: z.string().min(8, "Password must be at least 8 characters"),
//     confirmPassword: z.string(),
//     restaurantName: z.string().min(1, "Restaurant name is required"),
//     businessEmail: z.email({ pattern: z.regexes.email }),
//     contactPersonName: z.string().min(1, "Contact Person Name is required"),
//     contactPersonPhone: phoneSchema,
//     restaurantAddress: z.string().min(5),
//     cusineType: z.array(z.string().min(1, "Please select atleast 1 cusine")),
//   })
//   .refine((data) => data.password === data.confirmPassword, {
//     message: "Passwords do not match",
//     path: ["confirmPassword"],
//   });

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
