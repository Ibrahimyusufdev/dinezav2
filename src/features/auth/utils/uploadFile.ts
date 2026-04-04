import { supabase } from "@/lib/supabase";

export const uploadFile = async (file: File, path: string): Promise<string> => {
  const fileExt = file.name.split(".").pop();
  const fileName = `${crypto.randomUUID()}.${fileExt}`;

  const { error } = await supabase.storage
    .from("dineza_uploads")
    .upload(`${path}/${fileName}`, file);

  if (error) throw new Error(error.message);

  const { data } = supabase.storage.from("dineza_uploads").getPublicUrl(`${path}/${fileName}`);

  return data.publicUrl;
};
