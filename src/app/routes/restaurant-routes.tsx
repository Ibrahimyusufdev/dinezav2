import { Route } from "react-router-dom";
import { lazy } from "react";
import DashboardLayout from "../layouts/DashboardLayout";

// Pages for restaurant
const RestaurantDashboard = lazy(() => import("@/pages/restaurant/RestaurantDashboard.tsx"));
const ReservationPage = lazy(() => import("@/pages/restaurant/ReservationPage.tsx"));
const SpecialOffersPage = lazy(() => import("@/pages/restaurant/SpecialOffersPage.tsx"));
const AnalyticsPage = lazy(() => import("@/pages/restaurant/AnalyticsPage.tsx"));
const PaymentsPage = lazy(() => import("@/pages/restaurant/PaymentsPage.tsx"));
const GlobalNoPage = lazy(() => import("@/pages/shared/GlobalNoPage.tsx"));

// Shared pages across - Move pages to pages folder when you start building featues for the below
const InviteFriends = lazy(() => import("@/pages/diner/InviteFriends.tsx"));
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
