import { supabase } from "@/lib/supabase";
import { useAuthStore } from "../store/useAuthStore";
import { toast } from "sonner";

export const useLogout = () => {
  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error("Failed to sign out. Pleas try again");
    }

    toast.success("Logged out succesfully");
  };

  return { logout };
};
