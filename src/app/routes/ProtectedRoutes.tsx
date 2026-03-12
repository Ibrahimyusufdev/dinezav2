import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Spinner } from "@/components/ui/spinner";

import { useAuthStore } from "@/features/auth";
import ContentWrapper from "@/shared/components/ContentWrapper";
import { ROUTES } from "@/shared/types/constants";

const ProtectedRoutes = () => {
  // grab isAuthentication and isLoading from store
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isLoading = useAuthStore((state) => state.isLoading);

  // First checking is user is logged in
  if (isLoading) {
    return (
      <ContentWrapper>
        <div className="flex h-screen items-center justify-center">
          <Spinner className="size-10" />
        </div>
      </ContentWrapper>
    );
  }

  /*
    Redirect to login if user is not logged
    And also save where they were trying to go (to redirect back after login)
  */

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
  }

  // Outlet for protected route - show here
  return <Outlet />;
};

export default ProtectedRoutes;
