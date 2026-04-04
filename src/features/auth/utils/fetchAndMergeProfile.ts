import { supabase } from "@/lib/supabase";
import type { AuthUser } from "../types/auth.types";

// ─── fetchAndMergeProfile
// Takes a Supabase user ID, fetches the full profile from your DB
// Returns a fully typed AuthUser or null if profile doesn't exist yet
//
// This replaces mapSupabaseUser — instead of converting the Supabase user shape,
// we fetch the real data from your database which already has the correct shape
//
// Your DB profiles table should have:
// id, email, firstName, lastName, role, avatarUrl, phoneNumber, createdAt
// + role-specific fields (availableBalance, restaurantName etc)

export const fetchAndMergeProfile = async (userId: string): Promise<AuthUser | null> => {
  // Step 1: Get base profile to determine role
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error || !profile) {
    console.error("fetchAndMergeProfile: profile not found", error?.message);
    return null;
  }

  const role = profile.role;

  // Step 2: Fetch role-specific data and merge
  if (role === "diner") {
    const { data: dinerProfile } = await supabase
      .from("diner_profiles")
      .select("*")
      .eq("id", userId)
      .single();

    return {
      id: profile.id,
      email: profile.email,
      firstName: profile.first_name,
      lastName: profile.last_name,
      role: "diner",
      avatarUrl: profile.avatar_url,
      phoneNumber: profile.phone_number,
      createdAt: profile.created_at,
      // Diner-specific fields — default to 0 if not yet set
      preferredLocations: dinerProfile?.preferred_locations ?? [],
      totalEarnings: dinerProfile?.total_earnings ?? 0,
      pendingEarnings: dinerProfile?.pending_earnings ?? 0,
      availableBalance: dinerProfile?.available_balance ?? 0,
    };
  }

  if (role === "restaurant") {
    const { data: restaurantProfile } = await supabase
      .from("restaurant_profiles")
      .select("*")
      .eq("id", userId)
      .single();

    return {
      id: profile.id,
      email: profile.email,
      firstName: profile.first_name,
      lastName: profile.last_name,
      role: "restaurant",
      avatarUrl: profile.avatar_url,
      phoneNumber: profile.phone_number,
      createdAt: profile.created_at,
      // Restaurant-specific fields
      restaurantName: restaurantProfile?.restaurant_name,
      restaurantLogo: restaurantProfile?.restaurant_logo,
      businessEmail: restaurantProfile?.business_email,
      address: restaurantProfile?.address,
      cuisineType: restaurantProfile?.cuisine_type,
      isVerified: restaurantProfile?.is_verified ?? false,
      rating: restaurantProfile?.rating ?? 0,
      totalReservations: restaurantProfile?.total_reservations ?? 0,
      pendingReservations: restaurantProfile?.pending_reservations ?? 0,
      totalRevenue: restaurantProfile?.total_revenue ?? 0,
    };
  }

  if (role === "admin") {
    return {
      id: profile.id,
      email: profile.email,
      firstName: profile.first_name,
      lastName: profile.last_name,
      role: "admin",
      avatarUrl: profile.avatar_url,
      phoneNumber: profile.phone_number,
      createdAt: profile.created_at,
      permissions: profile.permissions ?? [],
      isSuperAdmin: profile.is_super_admin ?? false,
    };
  }

  return null;
};
