// Call this once at app root (App.tsx)
// Verifies the persisted user is still valid on every page load

import { useEffect } from "react";
import { useCurrentUser } from "./use-auth-store";
import { authService } from "../service/authService";
import { useAuthStore } from "../store/useAuthStore";

export const useInitAuth = () => {
  const user = useCurrentUser();

  const setAuth = useAuthStore((state) => state.setAuth);
  const setLoading = useAuthStore((state) => state.setLoading);
  const clearAuth = useAuthStore((state) => state.clearAuth);

  useEffect(() => {
    const initAuth = async () => {
      console.log(user);
      // if (!user) return; // No persisted user, nothing to verify

      // setLoading(true);
      // const result = await authService.refreshToken();

      // if (result.error) {
      //   clearAuth(); // Token expired - clear everything
      //   return;
      // }

      // // Update store with fresh token + user from backend
      // setAuth(result.data.user, result.data.accessToken);
    };

    initAuth();
  }, [user]);
};
