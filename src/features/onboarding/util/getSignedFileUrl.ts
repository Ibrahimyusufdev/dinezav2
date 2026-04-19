import { supabase } from "@/lib/supabase";
import { STORAGE_BUCKETS } from "../../onboarding/constants/storage.constants";

const DEFAULT_EXPIRES_IN = 60 * 60; // 1 hour

// Returns a short-lived signed URL for a file in the PRIVATE bucket.
// Use only for sensitive files (e.g. restaurant verification documents).
export const getSignedFileUrl = async (
  path: string,
  expiresIn: number = DEFAULT_EXPIRES_IN
): Promise<string | null> => {
  if (!path?.trim()) {
    console.warn("getSignedFileUrl: received empty path, skipping");
    return null;
  }

  const { data, error } = await supabase.storage
    .from(STORAGE_BUCKETS.PRIVATE)
    .createSignedUrl(path, expiresIn);

  if (error) {
    console.error("getSignedFileUrl: failed to create signed URL", {
      path,
      message: error.message,
    });
    return null;
  }

  return data?.signedUrl ?? null;
};
