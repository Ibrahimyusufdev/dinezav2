import { Route } from "react-router-dom";
import { lazy } from "react";
import DashboardLayout from "../layouts/DashboardLayout";

// Lazy-loaded admin pages
const AdminDashboard = lazy(() => import("@/pages/admin/AdminDashboard.tsx"));
const ManageRestaurants = lazy(() => import("@/pages/admin/ManageRestaurants.tsx"));
const ManageUsers = lazy(() => import("@/pages/admin/ManageUsers.tsx"));
const Analytics = lazy(() => import("@/pages/admin/Analytics.tsx"));
const Transactions = lazy(() => import("@/pages/admin/Transactions.tsx"));
const Settings = lazy(() => import("@/pages/admin/Settings.tsx"));
const Notifications = lazy(() => import("@/pages/admin/Notifications.tsx"));
const Reservations = lazy(() => import("@/pages/admin/Reservations.tsx"));
const Messages = lazy(() => import("@/pages/admin/Messages.tsx"));

// Move pages to pages folder when you start building featues for the below
const ProfilePage = lazy(() => import("@/features/profile/pages/ProfilePage"));

const GlobalNoPage = lazy(() => import("@/pages/shared/GlobalNoPage.tsx"));

import { PATHS } from "@/shared/types/constants";
import { ROUTE_META } from "@/shared/types/routeMeta";
import type { RouteHandle } from "@/shared/types/common";

export const adminRoutes = (
  <Route path={PATHS.ADMIN.ROOT} element={<DashboardLayout />}>
    <Route
      index
      element={<AdminDashboard />}
      handle={ROUTE_META.ADMIN.DASHBOARD satisfies RouteHandle}
    />
    <Route
      path={PATHS.ADMIN.RESTAURANTS}
      element={<ManageRestaurants />}
      handle={ROUTE_META.ADMIN.RESTAURANTS satisfies RouteHandle}
    />
    <Route
      path={PATHS.ADMIN.USERS}
      element={<ManageUsers />}
      handle={ROUTE_META.ADMIN.USERS satisfies RouteHandle}
    />
    <Route
      path={PATHS.ADMIN.TRANSACTIONS}
      element={<Transactions />}
      handle={ROUTE_META.ADMIN.TRANSACTIONS satisfies RouteHandle}
    />
    <Route
      path={PATHS.ADMIN.SETTINGS}
      element={<Settings />}
      handle={ROUTE_META.ADMIN.SETTINGS satisfies RouteHandle}
    />
    <Route
      path={PATHS.ADMIN.ANALYTICS}
      element={<Analytics />}
      handle={ROUTE_META.ADMIN.ANALYTICS satisfies RouteHandle}
    />
    <Route
      path={PATHS.ADMIN.NOTIFICATIONS}
      element={<Notifications />}
      handle={ROUTE_META.ADMIN.NOTIFICATIONS satisfies RouteHandle}
    />
    <Route
      path={PATHS.ADMIN.RESERVATIONS}
      element={<Reservations />}
      handle={ROUTE_META.ADMIN.RESERVATIONS satisfies RouteHandle}
    />
    <Route
      path={PATHS.ADMIN.MESSAGES}
      element={<Messages />}
      handle={ROUTE_META.ADMIN.MESSAGES satisfies RouteHandle}
    />
    <Route
      path={PATHS.ADMIN.PROFILE}
      element={<ProfilePage />}
      handle={ROUTE_META.ADMIN.PROFILE satisfies RouteHandle}
    />

    {/* Global no page */}
    <Route path="*" element={<GlobalNoPage />} />
  </Route>
);
