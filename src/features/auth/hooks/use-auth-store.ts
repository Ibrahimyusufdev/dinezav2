import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { supabase } from "@/lib/supabase";
import { fetchAndMergeProfile } from "../utils/fetchAndMergeProfile";
import type { AuthUser } from "../types/auth.types";

// Returns fully typed AuthUser or null
// Handles the null check once — enforces safe access everywhere
// For use OUTSIDE protected routes
export const useCurrentUser = (): AuthUser | null => {
  return useAuthStore((state) => state.user);
};
// export const useCurrentUser = () => {
//   const user = useAuthStore((state) => state.user);
//   const setAuth = useAuthStore((state) => state.setAuth);
//   const clearAuth = useAuthStore((state) => state.clearAuth);

//   useEffect(() => {
//     const getUser = async () => {
//       const { data, error } = await supabase.auth.getUser();
//       if (error || !data.user) {
//         clearAuth();
//         return;
//       }

//       const fullUser = await fetchAndMergeProfile(data.user.id);
//       if (fullUser) {
//         setAuth(fullUser);
//       } else {
//         clearAuth();
//       }
//     };

//     if (!user) getUser();
//   }, [user, setAuth, clearAuth]);

//   return user;
// };

// For use INSIDE protected routes — throws if somehow called without a user
export const useRequiredUser = () => {
  const user = useAuthStore((state) => state.user);

  if (!user) {
    throw new Error("useRequredUser must be used in a ProtectedRoute");
  }

  return user;
};
