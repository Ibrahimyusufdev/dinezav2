import { createClient } from "@supabase/supabase-js";

const supabaseURL = import.meta.env.VITE_SUPABASE_URL as string;
const supabase_Publishable_Key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY as string;

export const supabase = createClient(supabaseURL, supabase_Publishable_Key);
