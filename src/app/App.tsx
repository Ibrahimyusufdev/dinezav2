import { RouterProvider } from "react-router-dom";
import { router } from "@/app/router";

import { Toaster } from "@/components/ui/sonner";
import { QueryProvider } from "@/app/providers";
import { AuthProvider } from "@/app/providers";

const App = () => {
  return (
    <QueryProvider>
      <AuthProvider>
        <Toaster position="top-right" richColors />
        {/* All my routing composable here */}
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryProvider>
  );
};

export default App;
