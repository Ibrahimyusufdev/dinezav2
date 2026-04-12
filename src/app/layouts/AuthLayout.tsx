import { Outlet } from "react-router-dom";
import Footer from "../navigations/Footer";
import AuthHome from "@/shared/components/AuthHome";

const AuthLayout = () => {
  return (
    <main>
      <section className="bg-background relative min-h-screen md:px-8 md:py-15 lg:py-20">
        <AuthHome />

        <div className="flex min-h-[calc(100vh-2rem)] items-center justify-center md:min-h-[calc(100vh-3rem)] lg:min-h-[calc(100vh-4rem)]">
          <Outlet />
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default AuthLayout;
