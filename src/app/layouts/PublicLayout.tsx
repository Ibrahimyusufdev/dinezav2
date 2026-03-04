import { Outlet } from "react-router-dom";
import Navbar from "../navigations/Navbar";
import Footer from "../navigations/Footer";

const PublicLayout = () => {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default PublicLayout;
