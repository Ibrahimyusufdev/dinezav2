import { supabase } from "@/lib/supabase";
import { type StorageBucket } from "../../onboarding/constants/storage.constants";

// Deletes a single file from the specified bucket.
export const deleteFile = async (path: string, bucket: StorageBucket): Promise<void> => {
  if (!path?.trim()) {
    console.warn("deleteFile: empty path provided, skipping");
    return;
  }

  const { error } = await supabase.storage.from(bucket).remove([path]);

  if (error) {
    throw new Error(`deleteFile: failed to delete "${path}" from "${bucket}": ${error.message}`);
  }
};

// Deletes multiple files from the same bucket in a single API call.
export const deleteFiles = async (paths: string[], bucket: StorageBucket): Promise<void> => {
  const validPaths = paths.filter((p) => p?.trim());
  if (!validPaths.length) return;

  const { error } = await supabase.storage.from(bucket).remove(validPaths);

  if (error) {
    console.error("deleteFiles: batch delete failed", {
      bucket,
      paths: validPaths,
      message: error.message,
    });
    throw new Error(`deleteFiles: batch delete from "${bucket}" failed: ${error.message}`);
  }
};
