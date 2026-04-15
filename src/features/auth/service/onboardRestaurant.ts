import { supabase } from "@/lib/supabase";
import { uploadFile } from "../utils/uploadFile";
import type { OnboardRestaurantPayload } from "../types/auth.types";

export const onboardRestaurant = async (payload: OnboardRestaurantPayload) => {
  // 1. Get user
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    throw new Error("You must be logged in to complete onboarding");
  }

  const userId = user.id;

  // 2. Upload files
  let logoPath: string | null = null;
  let imagePaths: string[] = [];
  let documentPaths: string[] = [];

  try {
    // Logo
    if (payload.logoFile) {
      logoPath = await uploadFile(payload.logoFile, `restaurants/${userId}/logo`);
    }

    // Images
    if (payload.imageFiles?.length) {
      imagePaths = await Promise.all(
        payload.imageFiles.map((file) => uploadFile(file, `restaurants/${userId}/images`))
      );
    }

    // Documents
    if (payload.documentFiles?.length) {
      documentPaths = await Promise.all(
        payload.documentFiles.map((file) => uploadFile(file, `restaurants/${userId}/documents`))
      );
    }
  } catch (error) {
    console.error("File upload failed:", error);
    throw new Error("Failed to upload files. Please try again.");
  }

  // 3. Update base profile
  const { error: profileError } = await supabase
    .from("profiles")
    .update({
      first_name: payload.firstName,
      last_name: payload.lastName,
      phone_number: payload.contactPhone,
      role: "restaurant",
      updated_at: new Date().toISOString(),
    })
    .eq("id", userId);

  if (profileError) {
    console.error("Profile update error:", profileError);
    throw new Error(profileError.message);
  }

  // 4. Upsert restaurant profile
  const { error: restaurantError } = await supabase.from("restaurant_profiles").upsert({
    profile_id: userId,
    restaurant_name: payload.restaurantName,
    restaurant_logo: logoPath,
    business_email: payload.businessEmail,
    address: payload.address,
    cuisine_type: payload.cuisineType,
    contact_name: payload.contactName,
    contact_phone: payload.contactPhone,
    restaurant_images: imagePaths,
    documents: documentPaths,
  });

  if (restaurantError) {
    console.error("Restaurant profile error:", restaurantError);
    throw new Error(restaurantError.message || "Failed to create restaurant profile");
  }

  return { success: true, userId };
};
