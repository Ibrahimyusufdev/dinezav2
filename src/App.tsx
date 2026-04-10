import { RouterProvider } from "react-router-dom";
import { router } from "@/app/router";

import { Toaster } from "./components/ui/sonner";

// React Query

const App = () => {
  return (
    <>
      <Toaster position="top-right" richColors />
      {/* All my routing composable here */}
      <RouterProvider router={router} />
    </>
  );
};

export default App;
