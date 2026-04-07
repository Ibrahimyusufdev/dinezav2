import { Outlet } from "react-router-dom";

import { useAuthStore, useInitAuth } from "@/features/auth";
import { AppLoader } from "@/shared/components/AppLoader";

const RootLayout = () => {
  useInitAuth();
  // const isAuthReady = useAuthStore((state) => state.isAuthReady);

  // if (!isAuthReady) return <AppLoader />;

  return <Outlet />;
};

export default RootLayout;
