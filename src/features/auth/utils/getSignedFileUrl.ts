import { supabase } from "@/lib/supabase";

export const getSignedFileUrl = async (
  path: string,
  expiresIn = 60 * 60 // 1 hour
): Promise<string | null> => {
  const { data, error } = await supabase.storage
    .from("dineza_uploads")
    .createSignedUrl(path, expiresIn);

  if (error) {
    console.error("Signed URL error:", error);
    return null;
  }

  return data?.signedUrl ?? null;
};
