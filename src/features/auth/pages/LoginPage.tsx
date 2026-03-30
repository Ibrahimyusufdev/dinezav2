import { LoginForm } from "../components/LoginForm";

export const LoginPage = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center bg-muted rounded-2xl p-5 min-h-[calc(100vh-2rem)] md:min-h-[calc(100vh-3rem)] md:p-8 lg:min-h-[calc(100vh-4rem)] lg:p-10">
      <div className="w-full max-w-sm md:max-w-4xl">
        <LoginForm />
      </div>
    </div>
  );
};
