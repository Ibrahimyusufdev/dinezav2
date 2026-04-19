import z from "zod";
import { phoneSchema } from "@/shared/helpers/formatPhoneNumber";

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

export type DinerOnboardData = z.infer<typeof dinerOnboardSchema>;
export type RestaurantOnboardData = z.infer<typeof restaurantOnboardSchema>;
