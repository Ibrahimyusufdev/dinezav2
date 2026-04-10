import { supabase } from "@/lib/supabase";
import type { AuthUser } from "../types/auth.types";

export const fetchAndMergeProfile = async (userId: string): Promise<AuthUser | null> => {
  try {
    const { data: profile, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (error) {
      console.error("fetchAndMergeProfile: error fetching profile:", error.message);
      console.error("Error Details", {
        message: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint,
      });
      return null;
    }

    if (!profile) {
      console.error("fetchAndMergeProfile: no profile found for", userId);
      return null;
    }

    const baseUser = {
      id: profile.id,
      email: profile.email,
      firstName: profile.first_name ?? "",
      lastName: profile.last_name ?? "",
      isOnboarded: profile.is_onboarded,
      avatarUrl: profile.profile_picture_url ?? null,
      phoneNumber: profile.phone_number ?? null,
      createdAt: profile.created_at,
    };

    const role = profile.role;
    // No role yet, user verified email but hasn't completed onboarding
    // Return minimal shape so useAuthListener can read isRole = null and redirect to /onboarding
    if (!role) {
      return {
        ...baseUser,
        role: null,
      };
    }
    if (role === "diner") {
      const { data: dinerProfile, error: dinerError } = await supabase
        .from("diner_profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (dinerError) {
        console.warn("fetchAndMergeProfile: diner profile not found, using defaults");
      }
      return {
        ...baseUser,
        role: "diner",
        // Diner specific fields
        preferredLocations: dinerProfile?.preferred_locations ?? [],
        totalEarnings: dinerProfile?.total_earnings ?? 0,
        pendingEarnings: dinerProfile?.pending_earnings ?? 0,
        availableBalance: dinerProfile?.available_balance ?? 0,
      };
    }
    if (role === "restaurant") {
      const { data: restaurantProfile, error: restaurantError } = await supabase
        .from("restaurant_profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (restaurantError) {
        console.warn("fetchAndMergeProfile: restaurant profile not found, using defaults");
      }
      return {
        ...baseUser,
        role: "restaurant",
        // Restaurant specific fields
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
        ...baseUser,
        role: "admin",
        permissions: profile.permissions ?? [],
        isSuperAdmin: profile.is_super_admin ?? false,
      };
    }

    console.error("fetchAndMergeProfile: unknown role", role);
    return null;
  } catch (error) {
    console.error("fetchAndMergeProfile: unexpected error", error);
    return null;
  }
};
