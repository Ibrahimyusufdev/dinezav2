import { useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useQueryClient } from "@tanstack/react-query";

export const useAuthListener = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_OUT") {
        queryClient.setQueryData(["auth-user"], null);
        queryClient.removeQueries({ queryKey: ["auth-user"] });
      }

      if (event === "USER_UPDATED") {
        queryClient.invalidateQueries({ queryKey: ["auth-user"] });
      }
    });

    return () => subscription.unsubscribe();
  }, []);
};
