import { AuthPageShell } from "@/features/auth";
import { RegisterForm } from "@/features/auth";

export const RegisterPage = () => (
  <AuthPageShell>
    <div className="mx-auto w-full max-w-lg md:max-w-6xl">
      <RegisterForm />
    </div>
  </AuthPageShell>
);

export default RegisterPage;
