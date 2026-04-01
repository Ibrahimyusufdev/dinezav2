import type { User } from "@supabase/supabase-js";
import type { AuthUser, UserRole } from "../types/auth.types";

// ─── mapSupabaseUser ──────────────────────────────────────────────────────────
// Supabase returns its own User shape
// This converts it to your AuthUser discriminated union
// Role-specific fields (restaurantName etc) come from your DB profile
// user_metadata holds what you stored during signUp()

export const mapSupabaseUser = (supabaseUser: User): AuthUser => {
  const meta = supabaseUser.user_metadata;
  const role = (meta?.role as UserRole) ?? null;
  console.log(meta)

  // Google user — no role assigned yet
  if (!role) {
    const fullName = meta?.full_name ?? meta?.name ?? "";
    const [first, ...rest] = fullName.split(" "); 

    return {
      id: supabaseUser.id,
      email: supabaseUser.email ?? "",
      firstName: first ?? "",
      lastName: rest.join(" ") ?? "",
      role: "diner",
      avatarUrl: meta?.avatar_url,
      createdAt: supabaseUser.created_at,
    };
  }

  const base = {
    id: supabaseUser.id,
    email: supabaseUser.email ?? "",
    firstName: meta?.firstName ?? "",
    lastName: meta?.lastName ?? "",
    role: role as UserRole,
    avatarUrl: meta?.avatarUrl,
    createdAt: supabaseUser.created_at,
  };

  if (role === "restaurant") {
    return {
      ...base,
      role: "restaurant",
      restaurantName: meta?.restaurantName,
      businessEmail: meta?.businessEmail,
    };
  }

  if (role === "admin") {
    return { ...base, role: "admin" };
  }

  return { ...base, role: "diner" };
};
