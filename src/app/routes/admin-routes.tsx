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
  Messages
} from "@/features/admin";

import { PATHS } from "@/shared/types/constants";

export const adminRoutes = (
  <Route path={PATHS.ADMIN.ROOT} element={<DashboardLayout />}>
    <Route index element={<AdminDashboard />} />
    <Route path={PATHS.ADMIN.RESTAURANTS} element={<ManageRestaurants />} />
    <Route path={PATHS.ADMIN.USERS} element={<ManageUsers />} />
    <Route path={PATHS.ADMIN.TRANSACTIONS} element={<Transactions />} />
    <Route path={PATHS.ADMIN.SETTINGS} element={<Settings />} />
    <Route path={PATHS.ADMIN.ANALYTICS} element={<Analytics />} />
    <Route path={PATHS.ADMIN.NOTIFCATIONS} element={<Notifications />} />
    <Route path={PATHS.ADMIN.RESERVATIONS} element={<Reservations />} />
    <Route path={PATHS.ADMIN.MESSAGES} element={<Messages />} />
  </Route>
);
