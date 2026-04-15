import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

export const fetchLocation = async () => {
  const { data, error } = await supabase.from("locations").select("*");
  console.log("locations", data)

  if (error) throw new Error(error.message);
  return data;
};



export const useLocations = () => {
  return useQuery({
    queryKey: ["locations"],
    queryFn: fetchLocation,
    staleTime: 1000 * 60 * 10, // 10 mins
  });
};