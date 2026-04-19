import { AuthPageShell } from "../components/AuthPageShell";
import { LoginForm } from "../components/LoginForm";

export const LoginPage = () => (
  <AuthPageShell>
    <div className="mx-auto w-full max-w-lg md:max-w-6xl">
      <LoginForm />
    </div>
  </AuthPageShell>
);

export default LoginPage;
