import type { AuthUser, LoginAndRegisterPayload } from "../types/auth.types";

import { toast } from "sonner";
import { useAuthStore } from "../store/useAuthStore";

import { supabase } from "@/lib/supabase";
import { ROUTES } from "@/shared/types/constants";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { fetchUser } from "../service/fetchUser";
import { getDashboardByRole } from "@/shared/helpers/getDashboardByRole";

export const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const login = async (payload: LoginAndRegisterPayload) => {
    // Grabbing auth actions from store
    const { setLoading, setError, clearError } = useAuthStore.getState();

    setLoading(true);
    clearError();

    const toastId = toast.loading("Logging in...");

    try {
      // Hit the supabase signin with your payload
      const { error } = await supabase.auth.signInWithPassword({
        email: payload.email,
        password: payload.password,
      });

      if (error) {
        throw new Error(error.message);
      }

      // One DB hit, force fresh fetch, bypasses staleTime: Infinity
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

      toast.success("Welcome Back", {
        description: "Redirecting to your dashboard...",
        id: toastId,
      });

      navigate(getDashboardByRole[authUser.role]);
    } catch (error) {
      const message = error instanceof Error ? error.message : "An unexpected error occured";
      setError({ message: message });
      toast.error(message, { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  // Google login
  const handleGoogleLogin = async () => {
    const { setLoading, setError } = useAuthStore.getState();
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/${ROUTES.AUTH_CALLBACK}`,
      },
    });

    if (error) {
      setError({ message: error.message });
      toast.error(error.message);
    }
  };

  return { login, handleGoogleLogin };
};
