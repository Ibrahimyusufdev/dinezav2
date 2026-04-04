import { RegisterForm } from "../components/RegisterForm";

export const RegisterPage = () => {
  return (
    <div className="bg-muted flex min-h-[calc(100vh-2rem)] w-full flex-col items-center justify-center rounded-2xl p-5 md:min-h-[calc(100vh-3rem)] md:p-8 lg:min-h-[calc(100vh-4rem)] lg:p-10">
      <div className="w-full max-w-sm md:max-w-4xl">
        <RegisterForm />
      </div>
    </div>
  );
};
