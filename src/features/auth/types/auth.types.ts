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
  avatar?: string;
  createdAt?: Date;
  updatedAt?: Date;
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

  // // Activity tracking — important for auditing who did what
  // lastLogin?: Date;
  // lastActiveAt?: Date;

  // // Support related
  // assignedTickets?: number;
  // resolvedTickets?: number;

  // // Platform oversight stats
  // totalUsersManaged?: number;
  // totalRestaurantsManaged?: number;
}

// Making user to be either Diner, Restaurant, or Admin using discriminated Union in TS for AuthPurpose
export type AuthUser = Diner | Restaurant | Admin;

// AuthResponse Shape coming from Api
export interface AuthResponse {
  token: string;
  user: AuthUser;
}
