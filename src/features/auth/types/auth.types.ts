// User Roles
export type UserRole = "diner" | "restaurant" | "admin";

// Base User Interface - where I will extend the shape for Diner, Restaurant and admin
export interface BaseUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  avatarPath?: string;
  phoneNumber?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

// Unassigned User
export interface UnassignedUser extends Omit<BaseUser, "role"> {
  role: null;
}

// Diner User - extending from Base User with specific field added
export interface Diner extends BaseUser {
  role: "diner";
  preferredLocations?: string[];
  totalEarnings?: number;
  pendingEarnings?: number;
  availableBalance?: number;
}

// Restaurant User - extending from Base User with specific field added
export interface Restaurant extends BaseUser {
  role: "restaurant";
  restaurantName?: string;
  restaurantLogo?: string | null;
  businessEmail?: string;
  address?: string;
  cuisineType?: string;
  contactName?: string;
  contactPhone?: string;
  restaurantImages?: string[] | null;
  isVerified?: boolean;
  rating?: number;
  totalReservations?: number;
  pendingReservations?: number;
  totalRevenue?: number;
}

// Admin User - extending from Base User with specific field added
export interface Admin extends BaseUser {
  role: "admin";
  isSuperAdmin: boolean;
  adminLevel?: "super" | "moderator" | "support";
  permissions?: string[];
}

// Making user to be either Diner, Restaurant, or Admin using discriminated Union in TS for AuthPurpose
export type AuthUser = Diner | Restaurant | Admin | UnassignedUser;

// Login and Register Payload for supabase auth pattern
export interface LoginAndRegisterPayload {
  email: string;
  password: string;
}

// Diner payload
export interface OnboardDinerPayload {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  preferredDiningLocations: string[];
  avatarFile?: File | null;
}

// Restaurant payload
export interface OnboardRestaurantPayload {
  firstName: string;
  lastName: string;
  restaurantName: string;
  businessEmail: string;
  address: string;
  cuisineType: string[];
  contactName: string;
  contactPhone: string;

  logoFile?: File;
  imageFiles?: File[];
  documentFiles?: File[];
}

// // AuthResponse Shape coming from Api, what the backend returns after successful login or register
// export interface AuthResponse {
//   accessToken: string;
//   user: AuthUser;
// }