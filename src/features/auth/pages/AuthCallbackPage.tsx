import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { fetchUser } from "../service/fetchUser";
import { AppLoader } from "@/shared/components/AppLoader";
import { ROUTES } from "@/shared/types/constants";
import { getDashboardByRole } from "@/shared/helpers/getDashboardByRole";
import type { AuthUser } from "../types/auth.types";

export const AuthCallbackPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  useEffect(() => {
    const handleCallback = async () => {
      // Password recovery redirect
      if (window.location.hash.includes("type=recovery")) {
        navigate(ROUTES.RESET_PASSWORD);
        return;
      }

      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        navigate(ROUTES.LOGIN);
        return;
      }

      // Cache is empty after redirect - staleTime: 0 forces a fresh DB fetch
      // and also populates the cache for the rest of the app
      const authUser = await queryClient.fetchQuery<AuthUser | null>({
        queryKey: ["auth-user"],
        queryFn: fetchUser,
        staleTime: 0,
      });

      if (!authUser) {
        navigate(ROUTES.LOGIN);
        return;
      }

      if (!authUser.role) {
        navigate(ROUTES.REGISTER_SELECT);
        return;
      }

      navigate(getDashboardByRole[authUser.role]);
    };

    handleCallback();
  }, []); // runs once — this is intentional

  return <AppLoader />;
};
