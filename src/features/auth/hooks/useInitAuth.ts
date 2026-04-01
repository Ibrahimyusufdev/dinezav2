import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { supabase } from "@/lib/supabse";
import { mapSupabaseUser } from "./Mapsupabaseuser";

export const useInitAuth = () => {
  // Grab setauth and clear auth from store
  const setAuth = useAuthStore((state) => state.setAuth);
  const clearAuth = useAuthStore((state) => state.clearAuth);

  useEffect(() => {
    // Restore existing session on mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setAuth(mapSupabaseUser(session.user), session.access_token);
      }
    });

    // Listen for login, logout, token refresh, tab refocus
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
       
        setAuth(mapSupabaseUser(session.user), session.access_token);
      } else {
        clearAuth();
      }
    });

    return () => subscription.unsubscribe();
  }, []);
};
