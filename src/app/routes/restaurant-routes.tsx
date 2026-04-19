import { Route } from "react-router-dom";
import { lazy } from "react";
import DashboardLayout from "../layouts/DashboardLayout";

// Pages for restaurant
const RestaurantDashboard = lazy(() => import("@/features/restaurant/pages/RestaurantDashboard"));
const ReservationPage = lazy(() => import("@/features/restaurant/pages/ReservationPage"));
const SpecialOffersPage = lazy(() => import("@/features/restaurant/pages/SpecialOffersPage"));
const AnalyticsPage = lazy(() => import("@/features/restaurant/pages/AnalyticsPage"));
const PaymentsPage = lazy(() => import("@/features/restaurant/pages/PaymentsPage"));
const GlobalNoPage = lazy(() => import("../pages/GlobalNoPage.tsx"));

// Shared pages across
const InviteFriends = lazy(() => import("@/features/diner/pages/InviteFriends"));
const MessagingPage = lazy(() => import("@/features/messaging/pages/MessagingPage"));
const ProfilePage = lazy(() => import("@/features/profile/pages/ProfilePage"));

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
    {/* Global no page */}
    <Route path="*" element={<GlobalNoPage />} />
  </Route>
);
