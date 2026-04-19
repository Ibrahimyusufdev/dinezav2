import { supabase } from "@/lib/supabase";
import { fetchAndMergeProfile } from "./fetchAndMergeProfile";

export const fetchUser = async () => {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) return null;

  return fetchAndMergeProfile(user.id);
};
