// Types
export type {
  UserRole,
  BaseUser,
  Diner,
  Restaurant,
  Admin,
  AuthUser,
  LoginAndRegisterPayload,
} from "./types/auth.types";

// Validation
export type { ResetPasswordFormData } from "./validations/auth-schemas.ts";
export { resetPasswordSchema } from "./validations/auth-schemas.ts";

// Hooks
export { useLogin } from "./hooks/useLogin";
export { useLogout } from "./hooks/useLogout";
export { useRegister } from "./hooks/useRegister";
export { useCurrentUser } from "./hooks/useCurrentUser.ts";
export { useAuthListener } from "./hooks/useAuthListener.ts";

//  Store
export { useAuthStore } from "./store/useAuthStore";

// Queries
export { useAuthUser } from "./queries/useAuthUser.ts";
export { useAuthSession } from "./queries/useAuthSession.ts";
export { useForgotPassword } from "./queries/useForgotPassword.ts";
export { useResetPassword } from "./queries/useResetPassword.ts";

// Components
export { AuthBrandPanel } from "./components/AuthBrandPanel.tsx";
export { AuthPageShell } from "./components/AuthPageShell";
export { LoginForm } from "./components/LoginForm";
export { RegisterForm } from "./components/RegisterForm";
export { passwordRules, PasswordChecklist } from "./components/PasswordChecklist.tsx";

// Service
export { fetchUser } from "./service/fetchUser.ts";
