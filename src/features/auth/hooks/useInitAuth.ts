import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { supabase } from "@/lib/supabase";
import { fetchAndMergeProfile } from "../utils/fetchAndMergeProfile";

export const useInitAuth = () => {
  useEffect(() => {
    const { setUser, clearAuth, setAuth } = useAuthStore.getState();

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

        setAuth();

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
};

// useEffect(() => {
//   // Restore session on mount
//   const init = async () => {
//     try {
//       const { data: { session }, error} = await supabase.auth.getSession();
//       if (error || !session?.user) {
//         clearAuth();
//         return;
//       }

//       const fullUser = await fetchAndMergeProfile(session.user.id);

//       if (fullUser) {
//         setUser(fullUser);
//       } else {
//         clearAuth();
//       }
//     } catch (error) {
//       clearAuth();
//     }
//   };

//   init();

//   // Listen to Supabase auth state changes
//   const { data: listener } = supabase.auth.onAuthStateChange(async (_event, session) => {
//     if (!session?.user) {
//       clearAuth();
//       return;
//     }
//     const fullUser = await fetchAndMergeProfile(session.user.id);
//     if (fullUser) {
//       setUser(fullUser);
//     } else clearAuth();
//   });
//   return () => listener.subscription.unsubscribe();
// }, []);
