import DashboardLayout from "../layouts/DashboardLayout";
import { Route } from "react-router-dom";
import { PATHS } from "@/shared/types/constants";

// Pages for Diners
import { DinerDashboard, MyReservations, MyEarnings, InviteFriends } from "@/features/diner";
import { ExploreRestaurants } from "@/features/restaurants";
import { MessagingPage } from "@/features/messaging";
import { ProfilePage } from "@/features/profile";
import { ROUTE_META } from "@/shared/types/routeMeta";
import type { RouteHandle } from "@/shared/types/common";

export const dinerRoutes = (
  <Route path={PATHS.DINER.ROOT} element={<DashboardLayout />}>
    <Route index element={<DinerDashboard />} handle={ROUTE_META.DINER.DASHBOARD satisfies RouteHandle} />
    <Route path={PATHS.DINER.EXPLORE} element={<ExploreRestaurants />} handle={ROUTE_META.DINER.EXPLORE satisfies RouteHandle} />
    <Route path={PATHS.DINER.RESERVATIONS} element={<MyReservations />} handle={ROUTE_META.DINER.RESERVATIONS satisfies RouteHandle} />
    <Route path={PATHS.DINER.EARNINGS} element={<MyEarnings />} handle={ROUTE_META.DINER.EARNINGS satisfies RouteHandle} />
    <Route path={PATHS.DINER.INVITE} element={<InviteFriends />} handle={ROUTE_META.DINER.INVITE satisfies RouteHandle} />
    <Route path={PATHS.DINER.MESSAGES} element={<MessagingPage />} handle={ROUTE_META.DINER.MESSAGES satisfies RouteHandle} />
    <Route path={PATHS.DINER.PROFILE} element={<ProfilePage />} handle={ROUTE_META.DINER.PROFILE satisfies RouteHandle} />

    {/* Global no page */}
  </Route>
);
