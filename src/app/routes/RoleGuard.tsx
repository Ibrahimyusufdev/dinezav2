import { useAuthStore } from "@/features/auth";
import { ROUTES } from "@/shared/types/constants";
import type { UserRole } from "@/features/auth/types/auth.types";
import { Navigate, Outlet } from "react-router-dom";


interface RoleGuardPropos {
  allowedRoles: UserRole[];
}
export const RoleGuard = ({ allowedRoles }: RoleGuardPropos) => {
  const user = useAuthStore((state) => state.user);

  if (!user) {
    return <Navigate to={ROUTES.LOGIN} />;
  }


  // Check if a user role is the in the allowed list
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to={ROUTES.UNAUTHORIZED} />;
  }

  return <Outlet />;
};
