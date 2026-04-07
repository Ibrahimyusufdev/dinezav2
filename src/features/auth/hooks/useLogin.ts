import type { LoginAndRegisterPayload } from "../types/auth.types";

import { toast } from "sonner";
import { useAuthStore } from "../store/useAuthStore";

import { supabase } from "@/lib/supabase";
import { ROUTES } from "@/shared/types/constants";

export const useLogin = () => {
  // Grabbing auth actions from store

  const login = async (payload: LoginAndRegisterPayload) => {
    const { setLoading, setError, clearError } = useAuthStore.getState();
    setLoading(true);
    clearError();

    const toastId = toast.loading("Logging in...");

    try {
      // Hit the supabase signin with your payload
      const { data, error } = await supabase.auth.signInWithPassword({
        email: payload.email,
        password: payload.password,
      });

      if (error) {
        throw new Error(error.message);
      }

      toast.success("Welcome Back", {
        description: "Redirecting to your dashboard...",
        id: toastId,
      });
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
        redirectTo: ROUTES.HOME,
      },
    });

    if (error) {
      setError({ message: error.message });
      toast.error(error.message);
      setLoading(false);
    }
  };

  return { login, handleGoogleLogin };
};
