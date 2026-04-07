import { Navigate, Outlet } from "react-router-dom";
import { Spinner } from "@/components/ui/spinner";

import { useAuthStore, useCurrentUser } from "@/features/auth";
import ContentWrapper from "@/shared/components/ContentWrapper";
import { ROUTES } from "@/shared/types/constants";

const ProtectedRoutes = () => {
  // Grab isLoading and user from store
  const isLoading = useAuthStore((state) => state.isLoading);
  const user = useCurrentUser();

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

  if (!user) {
    return <Navigate to={ROUTES.LOGIN} state={{ from: location.pathname }} replace />;
  }

  // Outlet for protected route - show here
  return <Outlet />;
};

export default ProtectedRoutes;
