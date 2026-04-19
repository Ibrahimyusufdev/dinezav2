import { AuthPageShell } from "../components/AuthPageShell";
import { RegisterForm } from "../components/RegisterForm";

export const RegisterPage = () => (
  <AuthPageShell>
    <div className="mx-auto w-full max-w-lg md:max-w-6xl ">
      <RegisterForm />
    </div>
  </AuthPageShell>
);

export default RegisterPage;
