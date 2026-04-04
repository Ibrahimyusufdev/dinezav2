import { useCurrentUser, useRequiredUser } from "@/features/auth";
import { Navigate, Outlet } from "react-router-dom";
import { getDashboardByrole } from "../helpers/getDashboardByRole";
import { useAuthStore } from "@/features/auth";
import { ROUTES } from "@/shared/types/constants";

const GuestRoute = () => {
  // Check if user is authenticated and only allow them to access authenticated route
  const user = useCurrentUser();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isLoading = useAuthStore((state) => state.isLoading);

   // Wait for auth to initialize before deciding
  if (isLoading) return null;

  if (isAuthenticated && user) {
    return <Navigate to={getDashboardByrole[user.role] ?? ROUTES.HOME} replace />;
  }

  return <Outlet />;
};

export default GuestRoute;
