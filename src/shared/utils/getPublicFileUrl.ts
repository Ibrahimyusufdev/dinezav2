import { supabase } from "@/lib/supabase";
import { STORAGE_BUCKETS } from "../constants/storage.constants";

// Returns a permanent public URL for a file in the public bucket.
export const getPublicFileUrl = (path: string): string | null => {
  if (!path?.trim()) {
    console.warn("getPublicFileUrl: received empty path, skipping");
    return null;
  }

  const { data } = supabase.storage.from(STORAGE_BUCKETS.PUBLIC).getPublicUrl(path);

  return data.publicUrl ?? null;
};
