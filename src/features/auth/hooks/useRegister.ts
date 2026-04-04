import { supabase } from "@/lib/supabase";
import { useAuthStore } from "../store/useAuthStore";
import { toast } from "sonner";
import type { LoginAndRegisterPayload } from "../types/auth.types";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/shared/types/constants";

export const useRegister = () => {
  // Grabbing actions from auth store
  const setAuth = useAuthStore((state) => state.setAuth);
  const setLoading = useAuthStore((state) => state.setLoading);
  const setError = useAuthStore((state) => state.setError);
  const navigate = useNavigate();

  const register = async (payload: LoginAndRegisterPayload) => {
    setError(null);
    setLoading(true);

    const toastId = toast.loading("Creating your account...");

    try {
      // Hit the supabase with signup payload
      const { data, error } = await supabase.auth.signUp({
        email: payload.email,
        password: payload.password,
      });

      if (error) {
        throw new Error(error?.message ?? "an error occured");
      }

      toast.success("Please check your email to continue signup", { id: toastId });
      navigate(ROUTES.CONFIRM_EMAIL);
    } catch (error) {
      const message = error instanceof Error ? error.message : "An unexpected error occured";
      setError(message);
      toast.error(message, { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return { register };
};
