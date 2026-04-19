import { useQuery } from "@tanstack/react-query";
import { fetchUser } from "../service/fetchUser";
import type { AuthUser } from "../types/auth.types";

export const useAuthUser = () => {
  return useQuery<AuthUser | null>({
    queryKey: ["auth-user"],
    queryFn: fetchUser,
    refetchOnMount: true,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};
