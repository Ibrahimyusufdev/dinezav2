import { authService } from "../service/authService";
import { useAuthStore } from "../store/useAuthStore";

export const useLogout = () => {
  const clearAuth = useAuthStore((state) => state.clearAuth);

  const handleLogout = async () => {
    await authService.logout(); // Tell backend to invalidate session
    clearAuth(); // clear local store regardless of response;
  };

  return { logout: handleLogout };
};
