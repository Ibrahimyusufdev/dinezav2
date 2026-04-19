import { AuthPageShell } from "../components/AuthPageShell";
import { RestaurantOnboardingForm } from "../../onboarding/components/RestaurantOnboardForm";

export const RestaurantOnboardPage = () => {
  return (
    <AuthPageShell>
      <RestaurantOnboardingForm />
    </AuthPageShell>
  );
};

export default RestaurantOnboardPage;
