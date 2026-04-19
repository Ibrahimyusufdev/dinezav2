import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { onboardDiner } from "../service/onboardDiner";
import { ROUTES } from "@/shared/types/constants";

export const useOnboardDiner = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: onboardDiner,

    onSuccess: async () => {
      // Refresh auth user data
      await queryClient.invalidateQueries({ queryKey: ["auth-user"] });

      toast.success("Welcome to Dineza! Your profile is all set.");

      // Navigate to dashboard
      setTimeout(() => {
        navigate(ROUTES.DINER_DASHBOARD, { replace: true });
      }, 1000);
    },

    onError: (error) => {
      const message = error instanceof Error ? error.message : "Failed to complete onboarding";
      toast.error(message);
    },
  });
};
