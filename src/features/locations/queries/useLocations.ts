import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import type { Location } from "../types/location.types";

export const fetchLocations = async (): Promise<Location[]> => {
  const { data, error } = await supabase
    .from("locations")
    .select("id, name")
    .order("name", { ascending: true });

  if (error) throw new Error(error.message);

  return data ?? [];
};

export const useLocations = () => {
  return useQuery<Location[]>({
    queryKey: ["locations"],
    queryFn: fetchLocations,
    staleTime: 1000 * 60 * 10, // 10 min
    gcTime: 1000 * 60 * 30, // keep in cache 30 min after unmount
  });
};

export const useResolvedLocations = (locationIds: string[]): string[] => {
  const { data: locations } = useLocations();
  if (!locations || !locationIds.length) return [];
  return locations.filter((loc) => locationIds.includes(loc.id)).map((loc) => loc.name);
};
