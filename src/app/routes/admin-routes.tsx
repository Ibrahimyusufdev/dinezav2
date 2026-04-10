import { Route } from "react-router-dom";
import { lazy } from "react";
import DashboardLayout from "../layouts/DashboardLayout";

// Lazy-loaded admin pages
const AdminDashboard = lazy(() => import("@/features/admin/pages/AdminDashboard"));
const ManageRestaurants = lazy(() => import("@/features/admin/pages/ManageRestaurants"));
const ManageUsers = lazy(() => import("@/features/admin/pages/ManageUsers"));
const Analytics = lazy(() => import("@/features/admin/pages/Analytics"));
const Transactions = lazy(() => import("@/features/admin/pages/Transactions"));
const Settings = lazy(() => import("@/features/admin/pages/Settings"));
const Notifications = lazy(() => import("@/features/admin/pages/Notifications"));
const Reservations = lazy(() => import("@/features/admin/pages/Reservations"));
const Messages = lazy(() => import("@/features/admin/pages/Messages"));

const ProfilePage = lazy(() => import("@/features/profile/pages/ProfilePage"));

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
  </Route>
);
