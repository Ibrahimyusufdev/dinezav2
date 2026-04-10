import { supabase } from "@/lib/supabase";
import { fetchAndMergeProfile } from "../utils/fetchAndMergeProfile";

export const fetchUser = async () => {
  // Verify session exists before querying
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session?.user) {
    console.error("No active session found");
    return null;
  }

  console.log("Session verified, querying profile table");

  return fetchAndMergeProfile(session.user.id);
};
