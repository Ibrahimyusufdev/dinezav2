// Types
export type {
  UserRole,
  BaseUser,
  Diner,
  Restaurant,
  Admin,
  AuthUser,
  LoginPayload,
  RegisterDinerPayload,
  RegisterRestaurantPayload,
  AuthResponse,
} from "./types/auth.types";

//  Store
export { useAuthStore } from "./store/useAuthStore";

// Hooks
// export {useAuth, useCurrentUser, useAuthActions, useRequiredUser} from "./hooks/use-auth-store";
export {useLogin} from "./hooks/useLogin";
export {useLogout} from "./hooks/useLogout";
export {useRegister} from "./hooks/useRegister";
export {useCurrentUser, useRequiredUser} from "./hooks/use-auth-store";

export {useInitAuth} from "./hooks/useInitAuth";

// Pages
export {LoginPage} from "./pages/LoginPage.tsx";
export {RegisterPage} from "./pages/RegisterPage.tsx";
export {ConfirmEmailPage} from "./pages/ConfirmEmailPage.tsx"
