import { useAuthUser } from "@/features/auth";
import { ROUTES } from "@/shared/types/constants";
import { Navigate, Outlet } from "react-router-dom";

import { getDashboardByRole } from "@/shared/helpers/getDashboardByRole";

export const RequireGuest = () => {
  const { data: authUser } = useAuthUser();

  // if (isLoading) {
  //   return <AppLoader />
  // }

  // Already logged in, redirect to dashboard
  if (authUser && authUser.role) {
    return <Navigate to={getDashboardByRole[authUser.role]} replace />;
  }

  if (authUser && !authUser.role) {
    return <Navigate to={ROUTES.REGISTER_SELECT} replace />;
  }

  // Not logged in?, Allow all the routes here
  return <Outlet />;
};
