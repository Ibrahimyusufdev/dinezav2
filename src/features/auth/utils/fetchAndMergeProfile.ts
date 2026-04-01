import { supabase } from "@/lib/supabse";
import type { AuthUser } from "../types/auth.types";

export const fetchAndMergeProfile = async (userId: string): Promise<AuthUser | null> => {
  // Fetch base profile
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (profileError || !profile) return null;

  // Fetch role-specfic data
  let roleData = {};

  if (profile.role === "diner") {
    const { data, error } = await supabase
      .from("diner_profiles")
      .select("*")
      .eq("profile_id", userId)
      .single();
    if (!error && data) roleData = data;
  } else if (profile.role === "restaurant") {
    const { data, error } = await supabase
      .from("restaurant_profiles")
      .select("*")
      .eq("profile_id", userId)
      .single();
    if (!error && data) roleData = data;
  }

  //  Merge and return full AuthUser
  return { ...profile, ...roleData } as AuthUser;
};
