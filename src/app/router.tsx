import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import { ROUTES } from "@/shared/types/constants";
import { lazy } from "react";

// Layout
import PublicLayout from "./layouts/PublicLayout";
import AuthLayout from "./layouts/AuthLayout";
import RootLayout from "./layouts/RootLayout";

// Protected Routes & Role Guard
import { RoleGuard } from "./routes/RoleGuard";
import RequireAuth from "./routes/RequireAuth";
import { RequireGuest } from "./routes/RequireGuest";
import { RequireOnboarding } from "./routes/RequireOnboarding";

// Route Groups
import { dinerRoutes } from "./routes/diner-routes";
import { restaurantRoutes } from "./routes/restaurant-routes";
import { adminRoutes } from "./routes/admin-routes";

import {
  AuthCallbackPage,
  ConfirmEmailPage,
  LoginPage,
  RegisterPage,
  RegisterSelect,
} from "@/features/auth";

const GlobalNoPage = lazy(() => import("./pages/GlobalNoPage"));
const UnauthorizedPage = lazy(() => import("./pages/UnauthorizedPage"));

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<RootLayout />}>
      {/* Public layout routing */}
      <Route path="/" element={<PublicLayout />}>
        {/* Public route here */}
      </Route>

      {/* Callback for auth */}
      <Route path={ROUTES.AUTH_CALLBACK} element={<AuthCallbackPage />} />

      {/* Auth Layout Routing */}
      <Route element={<RequireGuest />}>
        <Route element={<AuthLayout />}>
          <Route path={ROUTES.LOGIN} element={<LoginPage />} />
          <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
          <Route path={ROUTES.CONFIRM_EMAIL} element={<ConfirmEmailPage />} />
        </Route>
      </Route>

      {/* Logged in, but not onboarded */}
      <Route element={<RequireOnboarding />}>
        <Route element={<AuthLayout />}>
          <Route path={ROUTES.REGISTER_SELECT} element={<RegisterSelect />} />
        </Route>
      </Route>

      {/* Protected Routing */}
      <Route element={<RequireAuth />}>
        <Route element={<RequireOnboarding />}>
          {/* Diner Protected routes Routes */}
          <Route element={<RoleGuard allowedRoles={["diner"]} />}>{dinerRoutes}</Route>

          {/* Restaurant Protected routes Routes */}
          <Route element={<RoleGuard allowedRoles={["restaurant"]} />}>{restaurantRoutes}</Route>

          {/* Admin Protected routes Routes */}
          <Route element={<RoleGuard allowedRoles={["admin"]} />}>{adminRoutes}</Route>
        </Route>
      </Route>

      {/* Global No page and Unauthorized page  */}
      <Route path="*" element={<GlobalNoPage />} />
      <Route path="/unauthorized" element={<UnauthorizedPage />} />
    </Route>
  )
);
