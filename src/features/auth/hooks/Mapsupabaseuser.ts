import type { User } from "@supabase/supabase-js";
import type { AuthUser, UserRole } from "../types/auth.types";

// ─── mapSupabaseUser ──────────────────────────────────────────────────────────
// Supabase returns its own User shape
// This converts it to your AuthUser discriminated union
// Role-specific fields (restaurantName etc) come from your DB profile
// user_metadata holds what you stored during signUp()

export const mapSupabaseUser = (supabaseUser: User): AuthUser => {
  const meta = supabaseUser.user_metadata;
  const role = (meta?.role as UserRole) ?? "diner";

  const base =  {
    id: supabaseUser.id,
    email: supabaseUser.email ?? "",
    firstName: meta?.firstName ?? "",
    lastName: meta?.lastName ?? "",
    role,
    avatarUrl: meta?.avatarUrl,
    createdAt: supabaseUser.created_at,
  };

  // Return the correct shape based on role
  // Extra fields like restaurantName come from your DB profiles table
  // and can be merged in later via updateUser()
  if (role === "restaurant") {
    return {
      ...base,
      role: "restaurant",
      restaurantName: meta?.restaurantName,
      businessEmail: meta?.businessEmail,
    };
  }

  if (role === "admin") {
    return {
      ...base,
      role: "admin",
    };
  }

  return {
    ...base,
    role: "diner",
  };
};