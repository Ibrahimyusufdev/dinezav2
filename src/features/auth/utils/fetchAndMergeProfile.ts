import { supabase } from "@/lib/supabase";
import type { AuthUser } from "../types/auth.types";

export const fetchAndMergeProfile = async (userId: string): Promise<AuthUser | null> => {
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

  // No role yet — user verified email but hasn't completed onboarding
  // Return minimal shape so useInitAuth can read isOnboarded = false
  // and redirect to /onboarding
  if (!role) {
    return {
      id: profile.id,
      email: profile.email,
      firstName: profile.first_name ?? "",
      lastName: profile.last_name ?? "",
      role: "diner", // temporary placeholder — set properly on onboarding
      isOnboarded: false,
      avatarUrl: profile.avatar_url ?? null,
      phoneNumber: profile.phone_number ?? null,
      createdAt: profile.created_at,
      preferredLocations: [],
      totalEarnings: 0,
      pendingEarnings: 0,
      availableBalance: 0,
    };
  }

  if (role === "diner") {
    const { data: dinerProfile } = await supabase
      .from("diner_profiles")
      .select("*")
      .eq("id", userId)
      .single();

    return {
      id: profile.id,
      email: profile.email,
      firstName: profile.first_name ?? "",
      lastName: profile.last_name ?? "",
      phoneNumber: profile.phone_number ?? null,
      role: "diner",
      isOnboarded: profile.is_onboarded,
      avatarUrl: profile.avatar_url ?? null,
      createdAt: profile.created_at,
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
      firstName: profile.first_name ?? "",
      lastName: profile.last_name ?? "",
      role: "restaurant",
      isOnboarded: profile.is_onboarded,
      avatarUrl: profile.avatar_url ?? null,
      phoneNumber: profile.phone_number ?? null,
      createdAt: profile.created_at,
      restaurantName: restaurantProfile?.restaurant_name ?? null,
      restaurantLogo: restaurantProfile?.restaurant_logo ?? null,
      businessEmail: restaurantProfile?.business_email ?? null,
      address: restaurantProfile?.address ?? null,
      cuisineType: restaurantProfile?.cuisine_type ?? null,
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
      firstName: profile.first_name ?? "",
      lastName: profile.last_name ?? "",
      role: "admin",
      isOnboarded: profile.is_onboarded,
      avatarUrl: profile.avatar_url ?? null,
      phoneNumber: profile.phone_number ?? null,
      createdAt: profile.created_at,
      permissions: profile.permissions ?? [],
      isSuperAdmin: profile.is_super_admin ?? false,
    };
  }

  return null;
};