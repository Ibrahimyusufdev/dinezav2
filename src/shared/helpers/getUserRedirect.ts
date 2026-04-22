import { ROUTES } from "@/shared/types/constants";
import { getDashboardByRole } from "./getDashboardByRole";
import type { AuthUser } from "@/features/auth";

export const getUserRedirect = (user: AuthUser | null): string => {
  if (!user) return ROUTES.LOGIN;

  if (!user.role) {
    return ROUTES.REGISTER_SELECT;
  }

  return getDashboardByRole[user.role];
};
