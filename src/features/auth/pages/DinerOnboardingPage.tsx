import { AuthPageShell } from "../components/AuthPageShell";
import { DinerOnboardingForm } from "../components/DinerOnboardingForm";

export const DinerOnboardingPage = () => {
  return (
    <AuthPageShell>
      <DinerOnboardingForm />
    </AuthPageShell>
  );
};

export default DinerOnboardingPage;