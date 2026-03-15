import DashboardLayout from "../layouts/DashboardLayout";
import { Route } from "react-router-dom";
import { PATHS } from "@/shared/types/constants";

// Pages for Diners
import { DinerDashboard, MyReservations, MyEarnings, InviteFriends } from "@/features/diner";
import { ExploreRestaurants } from "@/features/restaurants";
import { MessagingPage } from "@/features/messaging";
import { ProfilePage } from "@/features/profile";
import { ROUTE_META } from "@/shared/types/routeMeta";

export const dinerRoutes = (
  <Route path={PATHS.DINER.ROOT} element={<DashboardLayout />}>
    <Route index element={<DinerDashboard />} handle={ROUTE_META.DINER.DASHBOARD} />
    <Route path={PATHS.DINER.EXPLORE} element={<ExploreRestaurants />} handle={ROUTE_META.DINER.EXPLORE} />
    <Route path={PATHS.DINER.RESERVATIONS} element={<MyReservations />} handle={ROUTE_META.DINER.RESERVATIONS} />
    <Route path={PATHS.DINER.EARNINGS} element={<MyEarnings />} handle={ROUTE_META.DINER.EARNINGS} />
    <Route path={PATHS.DINER.INVITE} element={<InviteFriends />} handle={ROUTE_META.DINER.INVITE} />
    <Route path={PATHS.DINER.MESSAGES} element={<MessagingPage />} handle={ROUTE_META.DINER.MESSAGES} />
    <Route path={PATHS.DINER.PROFILE} element={<ProfilePage />} handle={ROUTE_META.DINER.PROFILE} />

    {/* Global no page */}
  </Route>
);
