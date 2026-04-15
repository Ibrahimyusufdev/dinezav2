import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { ROUTES } from "@/shared/types/constants";

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: async (email: string) => {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/${ROUTES.RESET_PASSWORD}`,
      });

      if (error) throw error;
    },

    onError: (error: Error) => {
      import("sonner").then(({ toast }) => {
        toast.error(error.message ?? "Failed to send reset email. Try again.");
      });
    },
  });
};
