import { AuthPageShell } from "@/features/auth";
import { RestaurantOnboardingForm } from "@/features/onboarding";

export const RestaurantOnboardPage = () => {
  return (
    <AuthPageShell>
      <RestaurantOnboardingForm />
    </AuthPageShell>
  );
};

export default RestaurantOnboardPage;
