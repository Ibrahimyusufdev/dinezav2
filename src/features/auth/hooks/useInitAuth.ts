import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { supabase } from "@/lib/supabse";
import { mapSupabaseUser } from "./mapsupabaseuser";
import { fetchAndMergeProfile } from "../utils/fetchAndMergeProfile";

export const useInitAuth = () => {
  const setAuth = useAuthStore((state) => state.setAuth);
  const clearAuth = useAuthStore((state) => state.clearAuth);

  useEffect(() => {
    // Restore session on mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) return; // no session — nothing to restore

      const basicUser = mapSupabaseUser(session.user);
      const hasRole = !!session.user.user_metadata?.role;

      if (!hasRole) {
        // Google user with no role yet — store basic user only
        // App will redirect them to /select-role
        setAuth(basicUser, session.access_token);
        return;
      }

      // Normal user — fetch full profile from DB and merge
      fetchAndMergeProfile(basicUser, session.access_token, setAuth);
    });

    // Listen for all future auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (!session) {
        clearAuth();
        return;
      }

      const basicUser = mapSupabaseUser(session.user);
      const hasRole = !!session.user.user_metadata?.role;

      if (!hasRole) {
        // Google user - store basic user, let app redirect to /select-role
        setAuth(basicUser, session.access_token);
        return;
      }

      // Normal user - fetch and merge full profile
      fetchAndMergeProfile(basicUser, session.access_token, setAuth);
    });

    return () => subscription.unsubscribe();
  }, []);
};
