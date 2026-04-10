import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { AppLoader } from "@/shared/components/AppLoader";
import { useAuthUser } from "../queries/useAuthUser";
import { ROUTES } from "@/shared/types/constants";
import { getDashboardByRole } from "@/app/index";

export const AuthCallbackPage = () => {
  const navigate = useNavigate();
  const { data: authUser, isLoading } = useAuthUser();

  useEffect(() => {
    const handleRedirect = async () => {
      // ensure session is ready
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.user) {
        navigate(ROUTES.LOGIN);
        return;
      }

      // wait for React Query to resolve user
      if (isLoading) return;

      if (!authUser) {
        navigate(ROUTES.LOGIN);
        return;
      }

      // onboarding
      if (!authUser.role) {
        navigate(ROUTES.REGISTER_SELECT);
        return;
      }

      // fully onboarded
      navigate(getDashboardByRole[authUser.role]);
    };

    handleRedirect();
  }, [authUser, isLoading]);

  return <AppLoader />;
};
