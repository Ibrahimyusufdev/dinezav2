import { Outlet } from "react-router-dom";
import Navbar from "../navigations/Navbar";
import Footer from "../navigations/Footer";

const PublicLayout = () => {
  return (
    <section className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </section>
  );
};

export default PublicLayout;
