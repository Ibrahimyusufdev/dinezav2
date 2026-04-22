import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import { EXTERNAL_LINKS, ROUTES } from "@/shared/types/constants";
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
  ForgotPasswordPage,
  ResetPasswordPage,
} from "@/pages/auth";

import { DinerOnboardingPage, RegisterSelectPage, RestaurantOnboardPage } from "@/pages/onboarding";
import { LandingPage } from "@/pages/landing/LandingPage";

import { ExternalLayout } from "@/features/externalPages";

// Lazy Load External page
const AboutUsPage = lazy(() => import("@/features/externalPages/page/AboutUsPage"));
const ContactUsPage = lazy(() => import("@/features/externalPages/page/ContactUsPage"));
const HelpPage = lazy(() => import("@/features/externalPages/page/HelpPage"));
const PrivacyPolicyPage = lazy(() => import("@/features/externalPages/page/PrivacyPolicyPage"));
const TermsOfServicePage = lazy(() => import("@/features/externalPages/page/TermsOfServicePage"));
const FaqPage = lazy(() => import("@/features/externalPages/page/FaqPage"));

const GlobalNoPage = lazy(() => import("../pages/shared/GlobalNoPage"));
const UnauthorizedPage = lazy(() => import("../pages/shared/UnauthorizedPage"));

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<RootLayout />}>
      {/* Public layout routing */}
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<LandingPage />} />
      </Route>

      {/* External layout routing */}
      <Route path="/" element={<ExternalLayout />}>
        <Route path={EXTERNAL_LINKS.FAQ} element={<FaqPage />} />
        <Route path={EXTERNAL_LINKS.ABOUT_US} element={<AboutUsPage />} />
        <Route path={EXTERNAL_LINKS.CONTACT_US} element={<ContactUsPage />} />
        <Route path={EXTERNAL_LINKS.HELP} element={<HelpPage />} />
        <Route path={EXTERNAL_LINKS.PRIVACY_POLICY} element={<PrivacyPolicyPage />} />
        <Route path={EXTERNAL_LINKS.TERMS_OF_SERVICE} element={<TermsOfServicePage />} />
      </Route>

      {/* Callback for auth on signup */}
      <Route path={ROUTES.AUTH_CALLBACK} element={<AuthCallbackPage />} />

      {/* RequireGuest routing */}
      <Route element={<RequireGuest />}>
        <Route element={<AuthLayout />}>
          <Route path={ROUTES.LOGIN} element={<LoginPage />} />
          <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
          <Route path={ROUTES.CONFIRM_EMAIL} element={<ConfirmEmailPage />} />
        </Route>
      </Route>

      {/* Forgot and reset pass route, guest and auth can access */}
      <Route element={<AuthLayout />}>
        <Route path={ROUTES.RESET_PASSWORD} element={<ResetPasswordPage />} />
        <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPasswordPage />} />
      </Route>

      {/* Logged in, but not onboarded */}
      <Route element={<RequireOnboarding />}>
        <Route element={<AuthLayout />}>
          <Route path={ROUTES.REGISTER_SELECT} element={<RegisterSelectPage />} />
          <Route path={ROUTES.ONBOARD_DINER} element={<DinerOnboardingPage />} />
          <Route path={ROUTES.ONBOARD_RESTAURANT} element={<RestaurantOnboardPage />} />
        </Route>
      </Route>

      {/* Protected Routing */}
      <Route element={<RequireAuth />}>
        {/* Diner Protected routes Routes */}
        <Route element={<RoleGuard allowedRoles={["diner"]} />}>{dinerRoutes}</Route>

        {/* Restaurant Protected routes Routes */}
        <Route element={<RoleGuard allowedRoles={["restaurant"]} />}>{restaurantRoutes}</Route>

        {/* Admin Protected routes Routes */}
        <Route element={<RoleGuard allowedRoles={["admin"]} />}>{adminRoutes}</Route>
      </Route>

      {/* Global No page and Unauthorized page  */}
      <Route path="*" element={<GlobalNoPage />} />
      <Route path="/unauthorized" element={<UnauthorizedPage />} />
    </Route>
  )
);
