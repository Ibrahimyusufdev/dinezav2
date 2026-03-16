import { Route } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";

// Pages for admin
import {
  AdminDashboard,
  ManageRestaurants,
  ManageUsers,
  Analytics,
  Transactions,
  Settings,
  Notifications,
  Reservations,
  Messages,
} from "@/features/admin";

import { ProfilePage } from "@/features/profile";

import { PATHS} from "@/shared/types/constants";
import { ROUTE_META } from "@/shared/types/routeMeta";
import type { RouteHandle } from "@/shared/types/common";

export const adminRoutes = (
  <Route path={PATHS.ADMIN.ROOT} element={<DashboardLayout />}>
    <Route index element={<AdminDashboard />} handle={ROUTE_META.ADMIN.DASHBOARD satisfies RouteHandle} />
    <Route path={PATHS.ADMIN.RESTAURANTS} element={<ManageRestaurants />} handle={ROUTE_META.ADMIN.RESTAURANTS satisfies RouteHandle} />
    <Route path={PATHS.ADMIN.USERS} element={<ManageUsers />} handle={ROUTE_META.ADMIN.USERS satisfies RouteHandle}/>
    <Route path={PATHS.ADMIN.TRANSACTIONS} element={<Transactions />} handle={ROUTE_META.ADMIN.TRANSACTIONS satisfies RouteHandle}/>
    <Route path={PATHS.ADMIN.SETTINGS} element={<Settings />} handle={ROUTE_META.ADMIN.SETTINGS satisfies RouteHandle}/>
    <Route path={PATHS.ADMIN.ANALYTICS} element={<Analytics />} handle={ROUTE_META.ADMIN.ANALYTICS satisfies RouteHandle} />
    <Route path={PATHS.ADMIN.NOTIFCATIONS} element={<Notifications />} handle={ROUTE_META.ADMIN.NOTIFICATIONS satisfies RouteHandle} />
    <Route path={PATHS.ADMIN.RESERVATIONS} element={<Reservations />} handle={ROUTE_META.ADMIN.RESERVATIONS satisfies RouteHandle} />
    <Route path={PATHS.ADMIN.MESSAGES} element={<Messages />} handle={ROUTE_META.ADMIN.MESSAGES satisfies RouteHandle}/>
    <Route path={PATHS.ADMIN.PROFILE} element={<ProfilePage />} handle={ROUTE_META.ADMIN.PROFILE satisfies RouteHandle}/>
  </Route>
);
