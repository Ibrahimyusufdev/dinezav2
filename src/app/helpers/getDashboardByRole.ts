import { ROUTES } from "@/shared/types/constants";
import type { UserRole } from "@/features/auth";

// Wire up dashboard by role
export const getDashboardByrole: Record<UserRole, string> = {
  diner: ROUTES.DINER_DASHBOARD ?? ROUTES.HOME,
  restaurant: ROUTES.RESTAURANT_DASHBOARD ?? ROUTES.HOME,
  admin: ROUTES.ADMIN_DASHBOARD ?? ROUTES.HOME,
};
