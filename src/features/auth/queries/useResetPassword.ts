
import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

export const useResetPassword = () => {
  return useMutation({
    mutationFn: async (newPassword: string) => {
      const { error } = await supabase.auth.updateUser({
        password: newPassword ,
      });

      if (error) throw error;
    },

    onSuccess: () => {
      toast.success("Password updated successfully");
    },

    onError: (error) => {
      toast.error(error.message || "Failed to update password");
    },
  });
};