// Types
export type {
  UserRole,
  BaseUser,
  Diner,
  Restaurant,
  Admin,
  AuthUser,
  LoginAndRegisterPayload
} from "./types/auth.types";

//  Store
export { useAuthStore } from "./store/useAuthStore";

// Hooks
export {useLogin} from "./hooks/useLogin";
export {useLogout} from "./hooks/useLogout";
export {useRegister} from "./hooks/useRegister";
export {useCurrentUser, useRequiredUser} from "./hooks/use-auth-store";

export {useInitAuth} from "./hooks/useInitAuth";

// Pages
export {LoginPage} from "./pages/LoginPage.tsx";
export {RegisterPage} from "./pages/RegisterPage.tsx";
export {ConfirmEmailPage} from "./pages/ConfirmEmailPage.tsx"
export {RegisterSelect} from "./pages/RegisterSelect.tsx"
