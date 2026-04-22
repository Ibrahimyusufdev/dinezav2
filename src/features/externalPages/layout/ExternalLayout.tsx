import { Outlet } from "react-router-dom";
import NavBar from "../navigation/NavBar";
import Footer from "../navigation/Footer";

export const ExternalLayout = () => {
  return (
    <section className="flex min-h-screen flex-col">
      <NavBar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </section>
  );
};
