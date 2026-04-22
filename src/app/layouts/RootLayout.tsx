import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { AppLoader } from "@/shared/components/AppLoader";

const RootLayout = () => {
  return (
    <Suspense fallback={<AppLoader />}>
      <Outlet />
    </Suspense>
  );
};

export default RootLayout;
