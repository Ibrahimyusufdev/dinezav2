
import type { LoginPayload } from "../types/auth.types";
import { authService } from "../service/authService";
// import { useAuth, useAuthActions} from "./use-auth-store";
import { toast } from "sonner";
import { useAuthStore } from "../store/useAuthStore";
import { useCurrentUser} from "./use-auth-store";

export const useLogin = () => {
  // Grabbing auth actions from store

  const setAuth = useAuthStore((state) => state.setAuth)
  const setLoading = useAuthStore((state) => state.setLoading)
  const setError = useAuthStore((state) => state.setError);
  const user = useCurrentUser()

  const login = async (payload: LoginPayload) => {
    setError(null);
    setLoading(true);

    const toastId = toast.loading("Logging in...");

    const result = await authService.login(payload);

    toast.dismiss(toastId);
    setLoading(false);

    if (result.error) {
      setError(result.error.message);
      toast.error(result.error.message);
      return;
    }

    setAuth(result.data.user, result.data.accessToken);
    // setAuth already sets isLoading: false internally 
    toast.success(`Welcome back, ${user?.firstName}`);
  };

  return { login };
};
