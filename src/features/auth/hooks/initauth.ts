import { supabase } from "@/lib/supabase";
import { useEffect } from "react";

import { fetchAndMergeProfile } from "../utils/fetchAndMergeProfile";
import { useAuthStore } from "../store/useAuthStore";

const useInitAuth = () => {

  useEffect(() => {
    const { setUser, clearAuth } = useAuthStore.getState();
  
    // Check if user have an active session on app load
  
    const { data: { subscription }} = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_OUT") {
        clearAuth();
        return;
      }
  
      // INITIAL_SESSION fires on mount, covers session restore
      // SIGNED_IN fires on login, email verification, OAuth
      if (event === "INITIAL_SESSION" || event === "SIGNED_IN") {
        if (!session?.user) {
          clearAuth();
          return;
        }
  
        const fullUser = await fetchAndMergeProfile(session.user.id);
        if (fullUser) {
          setUser(fullUser);
        } else {
          clearAuth();
        }
      }
  
      // USER_UPDATED
      if (event === "USER_UPDATED" && session?.user) {
        const fullUser = await fetchAndMergeProfile(session.user.id);
        if (fullUser) setUser(fullUser);
      }
    });
  
    return () => subscription.unsubscribe();
  }, []);
}
