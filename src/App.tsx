import { RouterProvider } from "react-router-dom";
import { router } from "@/app/router";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { useAuthStore, useInitAuth } from "@/features/auth";

import { Toaster } from "./components/ui/sonner";

// React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 30000,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 0,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position="top-right" richColors />
      {/* All my routing composable here */}
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};

export default App;
