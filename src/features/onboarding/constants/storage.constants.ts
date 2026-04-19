export const STORAGE_BUCKETS = {
  PUBLIC: "dineza_public", // avatars, logos, restaurant images
  PRIVATE: "dineza_private", // restaurant verification documents
} as const;

export type StorageBucket = (typeof STORAGE_BUCKETS)[keyof typeof STORAGE_BUCKETS];

export const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"] as const;

export const ALLOWED_DOCUMENT_TYPES = ["application/pdf", "image/jpeg", "image/png"] as const;

export const ACCEPT_IMAGE_INPUT = "image/jpeg,image/png,image/webp";
export const ACCEPT_DOCUMENT_INPUT = "application/pdf,image/jpeg,image/png";

export const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024; // 5MB
export const MAX_DOCUMENT_SIZE_BYTES = 10 * 1024 * 1024; // 10MB

// Folder paths - keep file organisation consistent across the codebase
export const STORAGE_PATHS = {
  DINER_AVATAR: (userId: string) => `avatars/${userId}`,
  RESTAURANT_LOGO: (userId: string) => `restaurants/${userId}/logo`,
  RESTAURANT_IMAGES: (userId: string) => `restaurants/${userId}/images`,
  RESTAURANT_DOCUMENTS: (userId: string) => `restaurants/${userId}/documents`,
} as const;
