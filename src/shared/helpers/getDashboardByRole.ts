import { ROUTES } from "@/shared/types/constants";
import type { UserRole } from "@/features/auth";

// Wire up dashboard by role
export const getDashboardByRole: Record<UserRole, string> = {
  diner: ROUTES.DINER_DASHBOARD,
  restaurant: ROUTES.RESTAURANT_DASHBOARD,
  admin: ROUTES.ADMIN_DASHBOARD
};
