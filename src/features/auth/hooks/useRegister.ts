import { supabase } from "@/lib/supabase";
import { useAuthStore } from "../store/useAuthStore";
import { toast } from "sonner";
import type { LoginAndRegisterPayload } from "../types/auth.types";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/shared/types/constants";

export const useRegister = () => {
  // Grabbing actions from auth store

  const navigate = useNavigate();

  const register = async (payload: LoginAndRegisterPayload) => {
    const { setLoading, setError, clearError } = useAuthStore.getState();
    setLoading(true);
    clearError();

    const toastId = toast.loading("Creating your account...");

    try {
      // Hit the supabase with signup payload
      const { data, error } = await supabase.auth.signUp({
        email: payload.email,
        password: payload.password,

        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        throw new Error(error?.message);
      }

      if (data.user?.identities?.length === 0) {
        throw new Error("EMAIL_EXISTS");
      }

      toast.success("Check your email to continue signing up", { id: toastId });
      navigate(ROUTES.CONFIRM_EMAIL);
    } catch (error) {
      const message = error instanceof Error ? error.message : "An unexpected error occurred";
      if (message === "EMAIL_EXISTS") {
        setError({
          message: "This email is already in use.",
          code: "EMAIL_EXISTS",
        });
        toast.error("This email is already in use, want to sign in?", {
          id: toastId,
          action: {
            label: "Sign In",
            onClick: () => navigate(ROUTES.LOGIN),
          },
        });

        return;
      }
      setError({ message: message });
      toast.error(message, { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return { register };
};
