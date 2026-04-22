import { supabase } from "@/lib/supabase";
import type { OnboardDinerPayload } from "../types/onboard.types";
import { uploadFile, deleteFile } from "@/shared";
import { STORAGE_BUCKETS, STORAGE_PATHS } from "@/shared/constants/storage.constants";

interface OnboardResult {
  success: true;
  userId: string;
}

export const onboardDiner = async (payload: OnboardDinerPayload): Promise<OnboardResult> => {
  // Verify auth
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    throw new Error("You must be logged in to complete onboarding");
  }

  const userId = user.id;
  let avatarPath: string | null = null;
  let profileUpdated = false;

  try {
    // Upload avatar to PUBLIC bucket
    if (payload.avatarFile) {
      avatarPath = await uploadFile(
        payload.avatarFile,
        STORAGE_PATHS.DINER_AVATAR(userId),
        STORAGE_BUCKETS.PUBLIC
      );
    }

    // Update base profile
    const { error: profileError } = await supabase
      .from("profiles")
      .update({
        first_name: payload.firstName,
        last_name: payload.lastName,
        phone_number: payload.phoneNumber,
        role: "diner",
        updated_at: new Date().toISOString(),
      })
      .eq("id", userId);

    if (profileError) {
      throw new Error(`Profile update failed: ${profileError.message}`);
    }

    profileUpdated = true;

    // Upsert diner profile
    const { error: dinerError } = await supabase.from("diner_profiles").upsert({
      profile_id: userId,
      avatar_path: avatarPath,
      preferred_locations: payload.preferredDiningLocations,
      agreed_to_terms_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });

    if (dinerError) {
      throw new Error(`Diner profile creation failed: ${dinerError.message}`);
    }

    return { success: true, userId };
  } catch (err) {
    // Rollback - Delete avatar from PUBLIC bucket if it was uploaded before the DB write failed.
    if (avatarPath) {
      console.warn("onboardDiner: rolling back avatar upload", { avatarPath });
      await deleteFile(avatarPath, STORAGE_BUCKETS.PUBLIC).catch((deleteErr) => {
        console.error("onboardDiner: avatar rollback failed — file may be orphaned", {
          avatarPath,
          error: deleteErr,
        });
      });
    }

    // Reset profile role to null if the profiles update succeeded but the diner_profiles upsert failed.
    if (profileUpdated) {
      console.warn("onboardDiner: resetting profile role to null after failed upsert");
      await supabase
        .from("profiles")
        .update({ role: null, updated_at: new Date().toISOString() })
        .eq("id", userId)
        .then(({ error }) => {
          if (error) {
            console.error("onboardDiner: role reset also failed — user is in partial state", {
              userId,
              error,
            });
          }
        });
    }

    throw err instanceof Error
      ? err
      : new Error("Onboarding failed unexpectedly. Please try again.");
  }
};
