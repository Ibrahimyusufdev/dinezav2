import { supabase } from "@/lib/supabase";
import { uploadFile } from "../utils/uploadFile";
import { deleteFiles } from "../utils/deleteFile";
import type { OnboardRestaurantPayload } from "../types/auth.types";
import {
  STORAGE_BUCKETS,
  STORAGE_PATHS,
  type StorageBucket,
} from "../../onboarding/constants/storage.constants";

interface OnboardResult {
  success: true;
  userId: string;
}

// Track both path and bucket so the rollback can issue one batch delete
// per bucket rather than mixing files across bucket boundaries.
interface UploadedFile {
  path: string;
  bucket: StorageBucket;
}

export const onboardRestaurant = async (
  payload: OnboardRestaurantPayload
): Promise<OnboardResult> => {
  // Verify Auth
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    throw new Error("You must be logged in to complete onboarding");
  }

  const userId = user.id;
  const uploadedFiles: UploadedFile[] = [];
  let profileUpdated = false;

  try {
    // upload all files in parallel
    const [logoPath, imagePaths, documentPaths] = await Promise.all([
      payload.logoFile
        ? uploadFile(
            payload.logoFile,
            STORAGE_PATHS.RESTAURANT_LOGO(userId),
            STORAGE_BUCKETS.PUBLIC
          ).then((p) => {
            uploadedFiles.push({ path: p, bucket: STORAGE_BUCKETS.PUBLIC });
            return p;
          })
        : Promise.resolve(null as string | null),

      payload.imageFiles?.length
        ? Promise.all(
            payload.imageFiles.map((file) =>
              uploadFile(
                file,
                STORAGE_PATHS.RESTAURANT_IMAGES(userId),
                STORAGE_BUCKETS.PUBLIC
              ).then((p) => {
                uploadedFiles.push({ path: p, bucket: STORAGE_BUCKETS.PUBLIC });
                return p;
              })
            )
          )
        : Promise.resolve([] as string[]),

      payload.documentFiles?.length
        ? Promise.all(
            payload.documentFiles.map((file) =>
              uploadFile(
                file,
                STORAGE_PATHS.RESTAURANT_DOCUMENTS(userId),
                STORAGE_BUCKETS.PRIVATE
              ).then((p) => {
                uploadedFiles.push({ path: p, bucket: STORAGE_BUCKETS.PRIVATE });
                return p;
              })
            )
          )
        : Promise.resolve([] as string[]),
    ]);

    // update base profile
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
      throw new Error(`Profile update failed: ${profileError.message}`);
    }

    profileUpdated = true;

    // upsert restaurant profile
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
      updated_at: new Date().toISOString(),
    });

    if (restaurantError) {
      throw new Error(`Restaurant profile creation failed: ${restaurantError.message}`);
    }

    return { success: true, userId };
  } catch (err) {
    //Rollback

    // Batch-delete uploaded files, grouped by bucket.
    // deleteFiles calls .remove() once per bucket, not once per file.
    if (uploadedFiles.length > 0) {
      console.warn(
        `onboardRestaurant: rolling back ${uploadedFiles.length} uploaded file(s)`,
        uploadedFiles
      );

      const publicPaths = uploadedFiles
        .filter((f) => f.bucket === STORAGE_BUCKETS.PUBLIC)
        .map((f) => f.path);

      const privatePaths = uploadedFiles
        .filter((f) => f.bucket === STORAGE_BUCKETS.PRIVATE)
        .map((f) => f.path);

      await Promise.allSettled([
        publicPaths.length ? deleteFiles(publicPaths, STORAGE_BUCKETS.PUBLIC) : Promise.resolve(),
        privatePaths.length
          ? deleteFiles(privatePaths, STORAGE_BUCKETS.PRIVATE)
          : Promise.resolve(),
      ]).then((results) => {
        results.forEach((result) => {
          if (result.status === "rejected") {
            console.error("onboardRestaurant: file rollback failed — files may be orphaned", {
              error: result.reason,
            });
          }
        });
      });
    }

    // Reset profile role to null if the profiles update succeeded but
    //  the restaurant_profiles upsert failed.
    if (profileUpdated) {
      console.warn("onboardRestaurant: resetting profile role to null after failed upsert");
      await supabase
        .from("profiles")
        .update({ role: null, updated_at: new Date().toISOString() })
        .eq("id", userId)
        .then(({ error }) => {
          if (error) {
            console.error("onboardRestaurant: role reset also failed — user is in partial state", {
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
