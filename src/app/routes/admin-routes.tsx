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

export const adminRoutes = (
  <Route path={PATHS.ADMIN.ROOT} element={<DashboardLayout />}>
    <Route index element={<AdminDashboard />} handle={ROUTE_META.ADMIN.DASHBOARD} />
    <Route path={PATHS.ADMIN.RESTAURANTS} element={<ManageRestaurants />} handle={ROUTE_META.ADMIN.RESTAURANTS} />
    <Route path={PATHS.ADMIN.USERS} element={<ManageUsers />} handle={ROUTE_META.ADMIN.USERS}/>
    <Route path={PATHS.ADMIN.TRANSACTIONS} element={<Transactions />} handle={ROUTE_META.ADMIN.TRANSACTIONS}/>
    <Route path={PATHS.ADMIN.SETTINGS} element={<Settings />} handle={ROUTE_META.ADMIN.SETTINGS}/>
    <Route path={PATHS.ADMIN.ANALYTICS} element={<Analytics />} handle={ROUTE_META.ADMIN.ANALYTICS} />
    <Route path={PATHS.ADMIN.NOTIFCATIONS} element={<Notifications />} handle={ROUTE_META.ADMIN.NOTIFICATIONS} />
    <Route path={PATHS.ADMIN.RESERVATIONS} element={<Reservations />} handle={ROUTE_META.ADMIN.RESERVATIONS} />
    <Route path={PATHS.ADMIN.MESSAGES} element={<Messages />} handle={ROUTE_META.ADMIN.MESSAGES}/>
    <Route path={PATHS.ADMIN.PROFILE} element={<ProfilePage />} handle={ROUTE_META.ADMIN.PROFILE}/>
  </Route>
);
