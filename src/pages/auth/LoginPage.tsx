import { AuthPageShell } from "@/features/auth";
import { LoginForm } from "@/features/auth";

export const LoginPage = () => (
  <AuthPageShell>
    <div className="mx-auto w-full max-w-lg md:max-w-6xl">
      <LoginForm />
    </div>
  </AuthPageShell>
);

export default LoginPage;
