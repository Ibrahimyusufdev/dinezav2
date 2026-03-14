import { ROUTES } from "@/shared/types/constants";
import DashboardLayout from "../layouts/DashboardLayout";
import { Route } from "react-router-dom";
import { PATHS } from "@/shared/types/constants";

// Pages for Diners
import { DinerDashboard, MyReservations, MyEarnings, InviteFriends } from "@/features/diner";
import { ExploreRestaurants } from "@/features/restaurants";
import { MessagingPage } from "@/features/messaging";

export const dinerRoutes = (
  <Route path={PATHS.DINER.ROOT} element={<DashboardLayout />}>
    <Route index element={<DinerDashboard />} />
    <Route path={PATHS.DINER.EXPLORE} element={<ExploreRestaurants />} />
    <Route path={PATHS.DINER.RESERVATIONS} element={<MyReservations />} />
    <Route path={PATHS.DINER.EARNINGS} element={<MyEarnings />} />
    <Route path={PATHS.DINER.INVITE} element={<InviteFriends />} />
    <Route path={PATHS.DINER.MESSAGES} element={<MessagingPage />} />

    {/* Global no page */}
  </Route>
);
