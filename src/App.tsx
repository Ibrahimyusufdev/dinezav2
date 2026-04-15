import { RouterProvider } from "react-router-dom";
import { router } from "@/app/router";

import { Toaster } from "./components/ui/sonner";
import { useAuthUser } from "./features/auth";

// React Query

const App = () => {
  const { data: authUser } = useAuthUser();

  console.log("Fetched all user data", authUser);
  return (
    <>
      <Toaster position="top-right" richColors />
      {/* All my routing composable here */}
      <RouterProvider router={router} />
    </>
  );
};

export default App;
