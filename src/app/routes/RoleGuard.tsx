// import { useCurrentUser } from "@/features/auth";
import { ROUTES } from "@/shared/types/constants";
import type { UserRole } from "@/features/auth/types/auth.types";
import { Navigate, Outlet } from "react-router-dom";
import { useCurrentUser } from "@/features/auth";

interface RoleGuardPropos {
  allowedRoles: UserRole[];
}
export const RoleGuard = ({ allowedRoles }: RoleGuardPropos) => {
  const { authUser } = useCurrentUser();

  if (!authUser) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  // Check if a authUser role is the in the allowed list
  if (!authUser.role || !allowedRoles.includes(authUser.role)) {
    return <Navigate to={ROUTES.UNAUTHORIZED} />;
  }

  return <Outlet />;
};
