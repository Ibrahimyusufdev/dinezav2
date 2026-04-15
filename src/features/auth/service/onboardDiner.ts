import { supabase } from "@/lib/supabase";
import type { OnboardDinerPayload } from "../types/auth.types";
import { uploadFile } from "../utils/uploadFile";

export const onboardDiner = async (payload: OnboardDinerPayload) => {
  // Ensure user exists
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    throw new Error("You must be logged in to complete onboarding");
  }

  const userId = user.id;

  // Upload avatar if provided
  let avatarPath: string | null = null;

  if (payload.avatarFile) {
    try {
      avatarPath = await uploadFile(payload.avatarFile, `avatars/${userId}`);
    } catch (uploadError) {
      console.error("Avatar upload failed:", uploadError);
      throw new Error("Failed to upload profile image. Please try again.");
    }
  }

  // Update base profile
  const { error: profileError } = await supabase
    .from("profiles")
    .update({
      first_name: payload.firstName,
      last_name: payload.lastName,
      phone_number: payload.phoneNumber,
      role: "diner",
      avatar_path: avatarPath,
      updated_at: new Date().toISOString(),
    })
    .eq("id", userId);

  if (profileError) {
    console.error("Profile update error:", profileError);
    throw new Error(profileError.message || "Failed to update profile");
  }

  // Upsert diner profile
  const { error: dinerError } = await supabase.from("diner_profiles").upsert({
    profile_id: userId,
    preferred_locations: payload.preferredDiningLocations,
    agreed_to_terms_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  });

  if (dinerError) {
    console.error("Diner profile error:", dinerError);
    throw new Error(dinerError.message || "Failed to create diner profile");
  }

  return { success: true, userId };
};
