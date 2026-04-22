import { useAuthUser } from "../queries/useAuthUser";

export const useCurrentUser = () => {
  const { data } = useAuthUser();

  return { authUser: data ?? null };
};
