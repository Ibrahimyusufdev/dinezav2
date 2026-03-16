import { RouterProvider } from "react-router-dom";
import { router } from "@/app/router";

const App = () => {
  // All my routing composable here
return (
  <>
   <RouterProvider router={router} />
  </>
)
};

export default App;