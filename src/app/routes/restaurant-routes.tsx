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
import { ProfilePage } from "@/features/profile";

import { PATHS } from "@/shared/types/constants";
import { ROUTE_META } from "@/shared/types/routeMeta";
import type { RouteHandle } from "@/shared/types/common";

export const restaurantRoutes = (
  <Route path={PATHS.RESTAURANT.ROOT} element={<DashboardLayout />}>
    <Route
      index
      element={<RestaurantDashboard />}
      handle={ROUTE_META.RESTAURANT.DASHBOARD satisfies RouteHandle}
    />
    <Route
      path={PATHS.RESTAURANT.RESERVATIONS}
      element={<ReservationPage />}
      handle={ROUTE_META.RESTAURANT.RESERVATIONS satisfies RouteHandle}
    />
    <Route
      path={PATHS.RESTAURANT.SPECIAL_OFFER}
      element={<SpecialOffersPage />}
      handle={ROUTE_META.RESTAURANT.SPECIAL_OFFER satisfies RouteHandle}
    />
    <Route
      path={PATHS.RESTAURANT.ANALYTICS}
      element={<AnalyticsPage />}
      handle={ROUTE_META.RESTAURANT.ANALYTICS satisfies RouteHandle}
    />
    <Route
      path={PATHS.RESTAURANT.INVITE}
      element={<InviteFriends />}
      handle={ROUTE_META.RESTAURANT.INVITE satisfies RouteHandle}
    />
    <Route
      path={PATHS.RESTAURANT.PAYMENT}
      element={<PaymentsPage />}
      handle={ROUTE_META.RESTAURANT.PAYMENT satisfies RouteHandle}
    />
    <Route
      path={PATHS.RESTAURANT.MESSAGES}
      element={<MessagingPage />}
      handle={ROUTE_META.RESTAURANT.MESSAGES satisfies RouteHandle}
    />
    <Route
      path={PATHS.RESTAURANT.PROFILE}
      element={<ProfilePage />}
      handle={ROUTE_META.RESTAURANT.PROFILE satisfies RouteHandle}
    />
  </Route>
);
