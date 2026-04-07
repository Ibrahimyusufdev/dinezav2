import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { useAuthStore } from "../store/useAuthStore";
import { fetchAndMergeProfile } from "../utils/fetchAndMergeProfile";
import { ROUTES } from "@/shared/types/constants";
import { getDashboardByRole } from "@/app/index";

export const useInitAuth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const { setUser, clearAuth, setAuthReady } = useAuthStore.getState();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        try {
          if (event === "SIGNED_OUT") {
            clearAuth();
            navigate(ROUTES.LOGIN);
            return;
          }

          if (event === "INITIAL_SESSION" || event === "SIGNED_IN") {
            if (!session?.user) {
              clearAuth();
              return;
            }

            const fullUser = await fetchAndMergeProfile(session.user.id);

            if (!fullUser) {
              // Profile doesn't exist at all — something went wrong
              clearAuth();
              navigate(ROUTES.LOGIN);
              return;
            }

            setUser(fullUser);

            if (!fullUser.isOnboarded) {
              // Verified but hasn't filled in their details yet
              navigate(ROUTES.REGISTER_SELECT);
            } else if (event === "SIGNED_IN") {
              // Fresh login — send to their role dashboard
              navigate(getDashboardByRole[fullUser.role]);
            }
            // INITIAL_SESSION + isOnboarded → page refresh, stay put
          }

          if (event === "USER_UPDATED" && session?.user) {
            const fullUser = await fetchAndMergeProfile(session.user.id);
            if (fullUser) setUser(fullUser);
          }

          // TOKEN_REFRESHED — do nothing

        } catch (error) {
          console.error("useInitAuth error:", error);
          clearAuth();
          navigate(ROUTES.LOGIN);
        } finally {
          // Always called — unblocks the UI no matter what
          setAuthReady();
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);
};