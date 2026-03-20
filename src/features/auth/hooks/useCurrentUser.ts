import { useAuthStore } from "../store/useAuthStore";
import type { AuthUser } from "../types/auth.types";

export const useCurrentUser = (): AuthUser | null => {
  return useAuthStore((state) => state.user);
};
