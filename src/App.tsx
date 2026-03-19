import { RouterProvider } from "react-router-dom";
import { router } from "@/app/router";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const App = () => {
  // React Query
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 1,
        staleTime: 30000,
        refetchOnWindowFocus: false,
      },
      mutations: {
        retry: 2,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      {/* All my routing composable here */}
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};

export default App;
