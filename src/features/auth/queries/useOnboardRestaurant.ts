import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { onboardRestaurant } from "../service/onboardRestaurant";
import { ROUTES } from "@/shared/types/constants";

export const useOnboardRestaurant = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: onboardRestaurant,

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["auth-user"] });

      toast.success("Restaurant profile created successfully!");

      setTimeout(() => {
        navigate(ROUTES.RESTAURANT_DASHBOARD, { replace: true });
      }, 1000);
    },

    onError: (error) => {
      const message = error instanceof Error ? error.message : "Failed to complete onboarding";

      toast.error(message);
    },
  });
};