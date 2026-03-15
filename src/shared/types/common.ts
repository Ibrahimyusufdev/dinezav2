// User Roles
export type UserRole = "diner" | "restaurant" | "admin";

// Status
export type Status = "pending" | "active" | "inactive" | "suspended";

// Route Handle
export interface RouteHandle {
  title: string;
  description?: string;
  icon?: string;
  requiresAuth?: boolean;
}
