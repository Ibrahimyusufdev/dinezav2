import { useAuthUser } from "@/features/auth";
import { ROUTES } from "@/shared/types/constants";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { PageSkeleton } from "@/shared/components/skeletons";

const RequireAuth = () => {
  const { data: authUser, isLoading } = useAuthUser();
  const location = useLocation();

  if (isLoading) return <PageSkeleton />;

  // Not Logged in go to login
  if (!authUser) return <Navigate to={ROUTES.LOGIN} state={{ from: location.pathname }} replace />;

  // Not onboarded, edirect to onboarding
  if (!authUser.role) {
    return <Navigate to={ROUTES.REGISTER_SELECT} replace />;
  }

  // Logged In?, Allow all the route here
  return <Outlet />;
};

export default RequireAuth;
