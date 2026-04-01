import { supabase } from "@/lib/supabse";

export const createRoleProfile = async (userId: string, role: "diner" | "restaurant") => {
  // Update base profile
  const { error: profileError } = await supabase.from("profiles").update({ role }).eq("id", userId);

  if (profileError) throw profileError;

  // Insert into role table
  if (role === "diner") {
    const { error } = await supabase.from("diner_profiles").insert({
      profile_id: userId,
    });
    if (error) throw error;
  }

  if (role === "restaurant") {
    const { error } = await supabase.from("restaurant_profiles").insert({
      profile_id: userId,
    });
    if (error) throw error;
  }
};
