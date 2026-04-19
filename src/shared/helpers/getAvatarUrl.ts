import type { AuthUser } from "@/features/auth";

export const getAvatarUrl = (user: AuthUser): string | null => {
  switch (user.role) {
    case "diner":
      return user.avatarUrl;
    case "restaurant":
      return user.restaurantLogo ?? null;
    default:
      return null;
  }
};
