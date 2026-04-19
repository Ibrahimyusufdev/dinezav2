import { supabase } from "@/lib/supabase";
import {
  ALLOWED_IMAGE_TYPES,
  ALLOWED_DOCUMENT_TYPES,
  MAX_IMAGE_SIZE_BYTES,
  MAX_DOCUMENT_SIZE_BYTES,
  type StorageBucket,
} from "../../onboarding/constants/storage.constants";

const validateFile = (file: File, folderPath: string): void => {
  const isDocumentFolder = folderPath.includes("/documents");

  const allowedTypes: readonly string[] = isDocumentFolder
    ? ALLOWED_DOCUMENT_TYPES
    : ALLOWED_IMAGE_TYPES;
  const maxSize = isDocumentFolder ? MAX_DOCUMENT_SIZE_BYTES : MAX_IMAGE_SIZE_BYTES;

  if (!allowedTypes.includes(file.type as (typeof allowedTypes)[number])) {
    throw new Error(
      `Invalid file type "${file.type}" for "${file.name}". Allowed: ${allowedTypes.join(", ")}`
    );
  }

  if (file.size > maxSize) {
    const maxMB = (maxSize / (1024 * 1024)).toFixed(0);
    throw new Error(
      `"${file.name}" exceeds the ${maxMB}MB limit (${(file.size / 1024 / 1024).toFixed(1)}MB)`
    );
  }
};

export const uploadFile = async (
  file: File,
  folderPath: string,
  bucket: StorageBucket // caller decides public vs private
): Promise<string> => {
  validateFile(file, folderPath);

  const ext = file.name.split(".").pop()?.toLowerCase();
  if (!ext) {
    throw new Error(`Cannot determine file extension for "${file.name}"`);
  }

  const filePath = `${folderPath}/${crypto.randomUUID()}.${ext}`;

  const { error } = await supabase.storage.from(bucket).upload(filePath, file, {
    cacheControl: "3600",
    upsert: false,
    contentType: file.type,
  });

  if (error) {
    console.error("uploadFile: upload failed", { filePath, message: error.message });
    throw new Error(`Failed to upload "${file.name}": ${error.message}`);
  }

  return filePath;
};
