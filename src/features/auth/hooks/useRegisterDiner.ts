import { toast } from "sonner";
import { useAuthStore } from "../store/useAuthStore";
import type { RegisterDinerPayload } from "../types/auth.types";
import { supabase } from "@/lib/supabase";
import { UserRole } from "../types/auth.types";
import type { User } from "@supabase/supabase-js";

export const useRegisterDiner = () => {
  // Grabbing auth actions from store
  const setAuth = useAuthStore((state) => state.setAuth);
  const setLoading = useAuthStore((state) => state.setLoading);
  const setError = useAuthStore((state) => state.setError);

  const registerDiner = async (payload: RegisterDinerPayload) => {
    setLoading(true);
    setError(null);

    const toasId = toast.loading("Creating your account...");

    try {
      const { data, error } = await supabase.auth.signUp({
        email: payload.email,
        password: payload.password,
        options: {
          data: {
            firstName: payload.firstName,
            lastName: payload.lastName,
            role: "diner",
          },
        },
      });
    } catch (error) {}
  };
};
