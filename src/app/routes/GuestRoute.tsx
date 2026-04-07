import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/features/auth";
import { ROUTES } from "@/shared/types/constants";
import { getDashboardByRole } from "@/app/index";

const GuestRoute = () => {
  const user = useAuthStore((state) => state.user);

  // Already logged in and onboarded — send to their dashboard
  if (user?.isOnboarded) {
    return <Navigate to={getDashboardByRole[user.role]} replace />;
  }

  // Logged in but not onboarded — send to onboarding
  if (user && !user.isOnboarded) {
    return <Navigate to={ROUTES.REGISTER_SELECT} replace />;
  }

  return <Outlet />;
};

export default GuestRoute;