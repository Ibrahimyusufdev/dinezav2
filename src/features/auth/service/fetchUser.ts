import { supabase } from "@/lib/supabase";
import { fetchAndMergeProfile } from "../utils/fetchAndMergeProfile";

export const fetchUser = async () => {
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (sessionError) {
    console.error("fetchUser: failed to get session", sessionError.message);
    return null;
  }

  if (!session?.user) {
    return null;
  }

  console.log("Session verified, querying profile table");

  return fetchAndMergeProfile(session.user.id);
};
