import type { LoginPayload } from "../types/auth.types";
import { authService } from "../service/authService";
import { toast } from "sonner";
import { useAuthStore } from "../store/useAuthStore";
import { useCurrentUser } from "./use-auth-store";
import { supabase } from "@/lib/supabse";
import { mapSupabaseUser } from "./Mapsupabaseuser";

export const useLogin = () => {
  // Grabbing auth actions from store
  const setAuth = useAuthStore((state) => state.setAuth);
  const setLoading = useAuthStore((state) => state.setLoading);
  const setError = useAuthStore((state) => state.setError);
  const user = useCurrentUser();

  const login = async (payload: LoginPayload) => {
    setError(null);
    setLoading(true);

    const toastId = toast.loading("Logging in...");

    // Hit the supabase signin with your payload
    const { data, error } = await supabase.auth.signInWithPassword({
      email: payload.email,
      password: payload.password,
    });

    toast.dismiss(toastId);
    setLoading(false);

    if (error) {
      setError(error.message);
      toast.error(error.message);
      return false;
    }

    setAuth(mapSupabaseUser(data.user), data.session.access_token);
    toast.success(`Welcome back, ${user?.firstName}`);
    return true;
  };

  const handleGoogleLogin = async () => {
    const {error} = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://localhost:5173"
      }
    });

    if (error) {
      toast.error(error.message)
    }
  };

  return { login, handleGoogleLogin };
};
