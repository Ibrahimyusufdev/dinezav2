import { useAuthStore } from "@/features/auth";
import AuthHome from "@/shared/components/AuthHome";
import { Outlet, Navigate } from "react-router-dom";
import { getDashboardByrole } from "../helpers/getDashboardByRole";
import { ROUTES } from "@/shared/types/constants";
import { useCurrentUser } from "@/features/auth";

const AuthLayout = () => {
  // Check if user is authenticated and only allow them to access authenticated route
  const user = useCurrentUser();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (isAuthenticated && user) {
    return <Navigate to={getDashboardByrole[user.role] ?? ROUTES.HOME} replace />;
  }
  return (
    <main className="relative min-h-screen">
      {/* Top lef logo */}
      <AuthHome />
      {/* Centered auth content */}
      {/* Outlet for login and register page */}
      <div className="flex min-h-screen items-center justify-center">
        <Outlet />
      </div>
    </main>
  );
};

export default AuthLayout;
