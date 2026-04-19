import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

const fetchSession = async () => {
  const { data: { session } } = await supabase.auth.getSession();
  return session;
};

export const useAuthSession = () => {
  return useQuery({
    queryKey: ["auth-session"],
    queryFn: fetchSession,
    staleTime: Infinity,
    refetchOnMount: false,      // localStorage doesn't change between mounts
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};