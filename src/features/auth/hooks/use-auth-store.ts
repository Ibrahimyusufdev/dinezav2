import { useAuthStore } from "../store/useAuthStore";
import type { AuthUser } from "../types/auth.types";

// Returns fully typed AuthUser or null
// Handles the null check once — enforces safe access everywhere
// For use OUTSIDE protected routes

export const useCurrentUser = (): AuthUser | null => {
  return useAuthStore((state) => state.user);
};

// For use INSIDE protected routes — throws if somehow called without a user
export const useRequiredUser = () => {
  const user = useAuthStore((state) => state.user);

  if (!user) {
    throw new Error("useRequredUser must be used in a ProtectedRoute");
  }

  return user;
};
