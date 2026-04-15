import { supabase } from "@/lib/supabase";
import type { AuthUser } from "../types/auth.types";
import { getSignedFileUrl } from "./getSignedFileUrl";

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
        .eq("profile_id", userId)
        .single();

      if (dinerError) {
        console.warn("fetchAndMergeProfile: diner profile not found, using defaults", dinerError);
      }

      if (dinerProfile) {
        console.log(dinerProfile);
      }
      return {
        ...baseUser,
        role: "diner",
        // Diner specific fields
        avatarPath: dinerProfile.avatar_path ?? null,
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
        .eq("profile_id", userId)
        .single();

      let logoUrl = null;
      let imageUrls: string[] = [];

      if (restaurantProfile?.restaurant_logo) {
        logoUrl = await getSignedFileUrl(restaurantProfile.restaurant_logo);
      }

      if (restaurantProfile?.restaurant_images?.length) {
        imageUrls = await Promise.all(
          restaurantProfile.restaurant_images.map((path: string) => getSignedFileUrl(path))
        );
      }

      return {
        ...baseUser,
        role: "restaurant",
        restaurantName: restaurantProfile?.restaurant_name ?? null,
        restaurantLogo: logoUrl,
        restaurantImages: imageUrls,
        businessEmail: restaurantProfile?.business_email ?? null,
        address: restaurantProfile?.address ?? null,
        cuisineType: restaurantProfile?.cuisine_type ?? [],
        isVerified: restaurantProfile?.is_verified ?? false,
        rating: restaurantProfile?.rating ?? 0,
        totalReservations: restaurantProfile?.total_reservations ?? 0,
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
