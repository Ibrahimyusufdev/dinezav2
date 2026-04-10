import { useAuthUser } from "@/features/auth";
import { ROUTES } from "@/shared/types/constants";
import { Navigate, Outlet } from "react-router-dom";
import { getDashboardByRole } from "../helpers/getDashboardByRole";
import { AppLoader } from "@/shared/components/AppLoader";

export const RequireOnboarding = () => {
  const { data: authUser, isLoading } = useAuthUser();

  if (isLoading) return <AppLoader />;

  if (!authUser) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  if (!authUser.role) {
    return <Outlet />;
  }

  // Already onboarded, navigate to dashboard
  return <Navigate to={getDashboardByRole[authUser.role]} replace />;
};
