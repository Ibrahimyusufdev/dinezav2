import { AuthPageShell } from "../components/AuthPageShell";
import { DinerOnboardingForm } from "../../onboarding/components/DinerOnboardingForm";

export const DinerOnboardingPage = () => {
  return (
    <AuthPageShell>
      <DinerOnboardingForm />
    </AuthPageShell>
  );
};

export default DinerOnboardingPage;
