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

//  Store
export { useAuthStore } from "./store/useAuthStore";

// Hooks
export { useLogin } from "./hooks/useLogin";
export { useLogout } from "./hooks/useLogout";
export { useRegister } from "./hooks/useRegister";
export { useCurrentUser } from "./hooks/useCurrentUser.ts";

export { useAuthUser } from "./queries/useAuthUser.ts";
export { AuthProvider } from "./provider/AuthProvider.tsx";

// Pages
export { LoginPage } from "./pages/LoginPage.tsx";
export { RegisterPage } from "./pages/RegisterPage.tsx";
export { ConfirmEmailPage } from "./pages/ConfirmEmailPage.tsx";
export { RegisterSelectPage } from "./pages/RegisterSelectPage.tsx";
export { AuthCallbackPage } from "./pages/AuthCallbackPage.tsx";
export {ForgotPasswordPage} from "./pages/ForgetPasswordPage.tsx";
export { ResetPasswordPage } from "./pages/ResetPasswordPage.tsx";
