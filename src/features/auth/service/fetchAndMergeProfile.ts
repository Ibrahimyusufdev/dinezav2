import { supabase } from "@/lib/supabase";
import type { AuthUser } from "../types/auth.types";
import { getPublicFileUrl } from "@/shared/utils/getPublicFileUrl";
import { getSignedFileUrl } from "@/shared/utils/getSignedFileUrl";

export const BASE_PROFILE_COLUMN = `
  id,
  email,
  first_name,
  last_name,
  phone_number,
  created_at,
  role
`;

export const DINER_PROFILE_COLUMN = `
avatar_path,
preferred_locations
`;

export const RESTAURANT_PROFILE_COLUMN = `
restaurant_name,
restaurant_logo,
restaurant_images,
business_email,
address,
cuisine_type,
contact_name,
contact_phone,
documents,
is_verified,
rating,
total_reservations,
total_revenue`;

export const fetchAndMergeProfile = async (userId: string): Promise<AuthUser | null> => {
  console.log("Fetching user");
  if (!userId?.trim()) {
    console.error("fetchAndMergeProfile: userId is required");
    return null;
  }

  try {
    // Base profile
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select(BASE_PROFILE_COLUMN)
      .eq("id", userId)
      .single();

    if (profileError) {
      console.error("fetchAndMergeProfile: failed to fetch base profile", {
        userId,
        message: profileError.message,
        code: profileError.code,
        details: profileError.details,
        hint: profileError.hint,
      });
      return null;
    }

    if (!profile) {
      console.error("fetchAndMergeProfile: no profile row found for userId:", userId);
      return null;
    }

    // Base shape shared across all roles
    const baseUser = {
      id: profile.id,
      email: profile.email,
      firstName: profile.first_name ?? "",
      lastName: profile.last_name ?? "",
      phoneNumber: profile.phone_number ?? null,
      createdAt: profile.created_at,
    };

    console.log("Fetched base user");

    const role = profile.role;

    // No role, email verified but onboarding not complete
    if (!role) {
      return { ...baseUser, role: null };
    }

    // Diner
    if (role === "diner") {
      const { data: dinerProfile, error: dinerError } = await supabase
        .from("diner_profiles")
        .select(DINER_PROFILE_COLUMN)
        .eq("profile_id", userId)
        .single();

      if (dinerError) {
        console.error("fetchAndMergeProfile: failed to fetch diner profile", {
          userId,
          message: dinerError.message,
          code: dinerError.code,
        });
        return null;
      }

      // Public bucket
      const avatarUrl = dinerProfile.avatar_path
        ? getPublicFileUrl(dinerProfile.avatar_path)
        : null;

      console.log("Fetched diner user");

      return {
        ...baseUser,
        role: "diner",
        avatarUrl,
        avatarPath: dinerProfile.avatar_path ?? null, // raw paths
      };
    }

    // Restaurant
    if (role === "restaurant") {
      const { data: restaurantProfile, error: restaurantError } = await supabase
        .from("restaurant_profiles")
        .select(RESTAURANT_PROFILE_COLUMN)
        .eq("profile_id", userId)
        .single();

      if (restaurantError) {
        console.error("fetchAndMergeProfile: failed to fetch restaurant profile", {
          userId,
          message: restaurantError.message,
          code: restaurantError.code,
        });
        return null;
      }

      // Logo and images -> public bucket, synchronous
      const restaurantLogo = restaurantProfile.restaurant_logo
        ? getPublicFileUrl(restaurantProfile.restaurant_logo)
        : null;

      const restaurantImages = (restaurantProfile.restaurant_images ?? [])
        .map((path) => getPublicFileUrl(path))
        .filter((url): url is string => url !== null);

      // Documents -> private bucket, async signed URLs (admin use only)
      const documentUrls = await Promise.all(
        (restaurantProfile.documents ?? []).map((path) =>
          getSignedFileUrl(path).catch((err) => {
            console.warn("fetchAndMergeProfile: failed to sign document URL", { path, err });
            return null;
          })
        )
      ).then((urls) => urls.filter((url): url is string => url !== null));

      console.log("Fetched Restaurant user");

      return {
        ...baseUser,
        role: "restaurant",
        restaurantName: restaurantProfile.restaurant_name ?? null,
        restaurantLogo,
        restaurantImages,
        documentUrls,
        businessEmail: restaurantProfile.business_email ?? null,
        address: restaurantProfile.address ?? null,
        cuisineType: restaurantProfile.cuisine_type ?? [],
        contactName: restaurantProfile.contact_name ?? null,
        contactPhone: restaurantProfile.contact_phone ?? null,
        documents: restaurantProfile.documents ?? [], // raw paths kept for admin ops
        isVerified: restaurantProfile.is_verified ?? false,
        rating: restaurantProfile.rating ?? 0,
        totalReservations: restaurantProfile.total_reservations ?? 0,
        totalRevenue: restaurantProfile.total_revenue ?? 0,
      };
    }

    // Admin
    if (role === "admin") {
      return { ...baseUser, role: "admin" };
    }

    console.error("fetchAndMergeProfile: unhandled role — update this function", { role, userId });
    return null;
  } catch (err) {
    console.error("fetchAndMergeProfile: unexpected error", { userId, err });
    return null;
  }
};
