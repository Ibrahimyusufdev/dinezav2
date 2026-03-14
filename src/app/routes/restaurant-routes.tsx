import { Route } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";

// Pages for restaurant
import {
  RestaurantDashboard,
  ReservationPage,
  SpecialOffersPage,
  AnalyticsPage,
  PaymentsPage,
} from "@/features/restaurant";

import { InviteFriends } from "@/features/diner";
import { MessagingPage } from "@/features/messaging";

import { PATHS } from "@/shared/types/constants";

export const restaurantRoutes = (
  <Route path={PATHS.RESTAURANT.ROOT} element={<DashboardLayout />}>
    <Route index element={<RestaurantDashboard />} />
    <Route path={PATHS.RESTAURANT.RESERVATIONS} element={<ReservationPage />} />
    <Route path={PATHS.RESTAURANT.SPECIAL_OFFER} element={<SpecialOffersPage />} />
    <Route path={PATHS.RESTAURANT.ANALYTICS} element={<AnalyticsPage />} />
    <Route path={PATHS.RESTAURANT.INVITE} element={<InviteFriends />} />
    <Route path={PATHS.RESTAURANT.PAYMENT} element={<PaymentsPage />} />
    <Route path={PATHS.RESTAURANT.MESSAGES} element={<MessagingPage />} />
  </Route>
);
