import DashboardLayout from "../layouts/DashboardLayout";
import { Route } from "react-router-dom";
import { lazy } from "react";
import { PATHS } from "@/shared/types/constants";

// Lazy-loaded pages for Diners
const DinerDashboard = lazy(() => import("@/pages/diner/DinerDashboard"));
const MyReservations = lazy(() => import("@/pages/diner/MyReservations"));
const MyEarnings = lazy(() => import("@/pages/diner/MyEarnings"));
const InviteFriends = lazy(() => import("@/pages/diner/InviteFriends"));
const GlobalNoPage = lazy(() => import("@/pages/shared/GlobalNoPage.tsx"));

// Shared pages across roles - Move pages to pages folder when you start building featues for the below
const MessagingPage = lazy(() => import("@/features/messaging/pages/MessagingPage"));
const ProfilePage = lazy(() => import("@/features/profile/pages/ProfilePage"));

import { ROUTE_META } from "@/shared/types/routeMeta";
import type { RouteHandle } from "@/shared/types/common";

export const dinerRoutes = (
  <Route path={PATHS.DINER.ROOT} element={<DashboardLayout />}>
    <Route
      index
      element={<DinerDashboard />}
      handle={ROUTE_META.DINER.DASHBOARD satisfies RouteHandle}
    />
    <Route path={PATHS.DINER.EXPLORE} handle={ROUTE_META.DINER.EXPLORE satisfies RouteHandle} />
    <Route
      path={PATHS.DINER.RESERVATIONS}
      element={<MyReservations />}
      handle={ROUTE_META.DINER.RESERVATIONS satisfies RouteHandle}
    />
    <Route
      path={PATHS.DINER.EARNINGS}
      element={<MyEarnings />}
      handle={ROUTE_META.DINER.EARNINGS satisfies RouteHandle}
    />
    <Route
      path={PATHS.DINER.INVITE}
      element={<InviteFriends />}
      handle={ROUTE_META.DINER.INVITE satisfies RouteHandle}
    />
    <Route
      path={PATHS.DINER.MESSAGES}
      element={<MessagingPage />}
      handle={ROUTE_META.DINER.MESSAGES satisfies RouteHandle}
    />
    <Route
      path={PATHS.DINER.PROFILE}
      element={<ProfilePage />}
      handle={ROUTE_META.DINER.PROFILE satisfies RouteHandle}
    />

    {/* Global no page */}
    <Route path="*" element={<GlobalNoPage />} />
  </Route>
);
