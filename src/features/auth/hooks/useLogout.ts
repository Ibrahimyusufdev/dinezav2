import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

export const useLogout = () => {
  const logout = async () => {
    console.log("Trying sign out");
    const { error } = await supabase.auth.signOut();
    console.log("Did I hit supabase on this logout?");
    if (error) {
      toast.error("Failed to sign out. Pleas try again");
      return;
    }

    toast.success("Logged out succesfully");
    console.log("Logout successful");
  };

  return { logout };
};
