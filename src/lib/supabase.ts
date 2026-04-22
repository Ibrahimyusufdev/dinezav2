import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/supabase";

const supabaseURL = import.meta.env.VITE_SUPABASE_URL as string;
const supabase_Publishable_Key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY as string;

export const supabase = createClient<Database>(supabaseURL, supabase_Publishable_Key);
