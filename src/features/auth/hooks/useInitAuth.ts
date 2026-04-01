import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { supabase } from "@/lib/supabse";
import { fetchAndMergeProfile } from "../utils/fetchAndMergeProfile";

export const useInitAuth = () => {
  const setAuth = useAuthStore((state) => state.setAuth);
  const clearAuth = useAuthStore((state) => state.clearAuth);

  useEffect(() => {
    // Restore session on mount
    const init = async () => {
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();
        if (error || !session?.user) {
          clearAuth();
          return;
        }

        const fullUser = await fetchAndMergeProfile(session.user.id);

        if (fullUser) {
          setAuth(fullUser);
        } else {
          clearAuth();
        }
      } catch (error) {
        clearAuth();
      }
    };

    init();

    // Listen to Supabase auth state changes
    const { data: listener } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (!session?.user) {
        clearAuth();
        return;
      }
      const fullUser = await fetchAndMergeProfile(session.user.id);
      if (fullUser) {
        setAuth(fullUser);
      } else clearAuth();
    });
    return () => listener.subscription.unsubscribe();
  }, [setAuth, clearAuth]);
};
