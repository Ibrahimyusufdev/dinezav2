import { supabase } from "@/lib/supabase";

export const uploadFile = async (file: File, path: string): Promise<string> => {
  const fileExt = file.name.split(".").pop();
  const fileName = `${crypto.randomUUID()}.${fileExt}`;
  const filePath = `${path}/${fileName}`;

  const { error } = await supabase.storage.from("dineza_uploads").upload(filePath, file, {
    cacheControl: "3600",
    upsert: false,
  });

  if (error) {
    console.error("Upload error:", error);
    throw new Error(error.message);
  }

  return filePath;
};