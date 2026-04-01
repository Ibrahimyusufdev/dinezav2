import type { LoginPayload } from "../types/auth.types";

import { toast } from "sonner";
import { useAuthStore } from "../store/useAuthStore";

import { supabase } from "@/lib/supabse";

import { fetchAndMergeProfile } from "../utils/fetchAndMergeProfile";
import { ROUTES } from "@/shared/types/constants";

export const useLogin = () => {
  // Grabbing auth actions from store
  const setAuth = useAuthStore((state) => state.setAuth);
  const setLoading = useAuthStore((state) => state.setLoading);
  const setError = useAuthStore((state) => state.setError);

  const login = async (payload: LoginPayload) => {
    setLoading(true);
    setError(null);

    const toastId = toast.loading("Logging in...");

    try {
      // Hit the supabase signin with your payload
      const { data, error } = await supabase.auth.signInWithPassword({
        email: payload.email,
        password: payload.password,
      });

      if (error || !data.session?.user) {
        throw new Error(error?.message ?? "Login failed");
      }

      const fullUser = await fetchAndMergeProfile(data.session.user.id);
      if (!fullUser) {
        throw new Error("User profile not found");
      }

      setAuth(fullUser);
      toast.success(`Welcome back, ${fullUser.firstName}!`, { id: toastId });
    } catch (error) {
      const message = error instanceof Error ? error.message : "An unexpected error occured";
      setError(message);
      toast.error(message, { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  // Google login
  const handleGoogleLogin = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: ROUTES.HOME,
      },
    });

    if (error) {
      setError(error.message);
      toast.error(error.message);
      setLoading(false);
    }
  };

  return { login, handleGoogleLogin };
};
