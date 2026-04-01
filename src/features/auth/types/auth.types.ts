// User Roles
export type UserRole = "diner" | "restaurant" | "admin";

// Base User Interface - where I will extend the shape for Diner, Restaurant and admin
export interface BaseUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  profilePicture?: string;
  phoneNumber?: string;
  avatarUrl?: string;
  createdAt?: string;
  updatedAt?: string;
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
  restaurantLogo?: string;
  businessEmail?: string;
  address?: string;
  cuisineType?: string;
  isVerified?: boolean;
  rating?: number;
  totalReservations?: number;
  pendingReservations?: number;
  totalRevenue?: number;
}

// Admin User - extending from Base User with specific field added
export interface Admin extends BaseUser {
  role: "admin";
  // Access control
  adminLevel?: "super" | "moderator" | "support";
  permissions?: string[]; // e.g. ["manage_users", "manage_restaurants", "view_analytics"]
}

// Making user to be either Diner, Restaurant, or Admin using discriminated Union in TS for AuthPurpose
export type AuthUser = Diner | Restaurant | Admin;

// Api PayLoads
export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterDinerPayload {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface RegisterRestaurantPayload {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  restaurantName: string;
  businessEmail: string;
}

// AuthResponse Shape coming from Api, what the backend returns after successful login or register
export interface AuthResponse {
  accessToken: string;
  user: AuthUser;
}
