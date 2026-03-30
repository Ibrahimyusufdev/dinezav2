import { useAuthStore } from "@/features/auth";
import AuthHome from "@/shared/components/AuthHome";
import { Outlet, Navigate } from "react-router-dom";
import { getDashboardByrole } from "../helpers/getDashboardByRole";
import { ROUTES } from "@/shared/types/constants";
import { useCurrentUser } from "@/features/auth";
import Footer from "../navigations/Footer";

const AuthLayout = () => {
  // Check if user is authenticated and only allow them to access authenticated route
  const user = useCurrentUser();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (isAuthenticated && user) {
    return <Navigate to={getDashboardByrole[user.role] ?? ROUTES.HOME} replace />;
  }
  return (
    <main>
    
   
    <section className="bg-background relative min-h-screen md:p-6 lg:p-16">
      {/* Top lef logo */}

      <AuthHome />

      {/* Centered auth content */}
      {/* Outlet for login and register page */}
      <div className="flex min-h-[calc(100vh-2rem)] items-center justify-center md:min-h-[calc(100vh-3rem)] lg:min-h-[calc(100vh-4rem)]">
        <Outlet />
      </div>
     
    </section>
     <Footer />
     </main>
  );
};

export default AuthLayout;
