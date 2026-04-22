import { AuthPageShell } from "@/features/auth";
import { DinerOnboardingForm } from "@/features/onboarding";

export const DinerOnboardingPage = () => {
  return (
    <AuthPageShell>
      <DinerOnboardingForm />
    </AuthPageShell>
  );
};

export default DinerOnboardingPage;
