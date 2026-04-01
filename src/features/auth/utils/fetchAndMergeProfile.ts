import { supabase } from "@/lib/supabse";
import type { AuthUser } from "../types/auth.types";

export const fetchAndMergeProfile = async (
  basicUser: AuthUser,
  accessToken: string,
  setAuth: (user: AuthUser, token: string) => void
) => {
  if (basicUser.role === "diner") {
    const { data } = await supabase
      .from("diner_profiles")
      .select("*")
      .eq("id", basicUser.id)
      .single();

    if (data) {
      // Merge auth user + DB profile into one complete Diner object
      setAuth(
        {
          ...basicUser,
          role: "diner",
          totalEarnings: data.total_earnings,
          pendingEarnings: data.pending_earnings,
          availableBalance: data.available_balance,
          preferredLocations: data.preferred_locations,
        },
        accessToken
      );
    }
  }

  if (basicUser.role === "restaurant") {
    const { data } = await supabase
      .from("restaurant_profiles")
      .select("*")
      .eq("id", basicUser.id)
      .single();

    if (data) {
      setAuth(
        {
          ...basicUser,
          role: "restaurant",
          restaurantName: data.restaurant_name,
          businessEmail: data.business_email,
          isVerified: data.is_verified,
          rating: data.rating,
          totalReservations: data.total_reservations,
          pendingReservations: data.pending_reservations,
          totalRevenue: data.total_revenue,
        },
        accessToken
      );
    }
  }
};
