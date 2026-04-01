import { supabase } from "@/lib/supabse";
import { useAuthStore } from "../store/useAuthStore";
import { toast } from "sonner";

export const useLogout = () => {
  const clearAuth = useAuthStore((state) => state.clearAuth);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    clearAuth(); // clear local store regardless of response;
    toast.success("Logged out succesfully");
  };

  return { logout: handleLogout };
};
