import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";

// Layout
import PublicLayout from "./layouts/PublicLayout";
import AuthLayout from "./layouts/AuthLayout";

// Pages
import { LoginPage } from "@/features/auth";

// Protected Routes & Role Guard
import ProtectedRoutes from "./routes/ProtectedRoutes";
import { RoleGuard } from "./routes/RoleGuard";

// Route Groups
import { dinerRoutes } from "./routes/diner-routes";
import { restaurantRoutes } from "./routes/restaurant-routes";
import { adminRoutes } from "./routes/admin-routes";

// Error page and Unauthorized
import GlobalNoPage from "./pages/GlobalNoPage";
import UnauthorizedPage from "./pages/UnauthorizedPage";
import { ROUTES } from "@/shared/types/constants";


export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Public layout routing */}
      <Route path="/" element={<PublicLayout />}>
      {/* Public route here */}
      </Route>

      {/* Auth Layout Routing */}
      <Route element={<AuthLayout />}>
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        {/* <Route path={ROUTES.REGISTER_SELECT} element={<RegisterSelect />} /> */}
      </Route>

      {/* Protected Routing */}
      <Route element={<ProtectedRoutes />}>
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
    </>
  )
);
// export const Router = () => {
//   return (
//     <Routes>
//       {/* Public layout routing */}
//       <Route path="/" element={<PublicLayout />}></Route>

//       {/* Protected Routing */}
//       <Route element={<ProtectedRoutes />}>
//         {/* Diner Protected routes Routes */}
//         <Route element={<RoleGuard allowedRoles={["diner"]} />}>{dinerRoutes}</Route>

//         {/* Restaurant Protected routes Routes */}
//         <Route element={<RoleGuard allowedRoles={["restaurant"]} />}>{restaurantRoutes}</Route>

//         {/* Admin Protected routes Routes */}
//         <Route element={<RoleGuard allowedRoles={["admin"]} />}>{adminRoutes}</Route>
//       </Route>

//       {/* Global No page and Unauthorized page  */}
//       <Route path="*" element={<GlobalNoPage />} />
//       <Route path="/unauthorized" element={<UnauthorizedPage />} />
//     </Routes>
//   );
// };
