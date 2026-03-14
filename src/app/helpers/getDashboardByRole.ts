
import { ROUTES } from "@/shared/types/constants";
import type { UserRole } from "@/shared/types/common";

// Wire up dashboard by role
export const getDashboardByrole: Record<UserRole, string> = {
  diner: ROUTES.DINER_DASHBOARD,
  restaurant: ROUTES.RESTAURANT_DASHBOARD,
  admin: ROUTES.ADMIN_DASHBOARD,
};