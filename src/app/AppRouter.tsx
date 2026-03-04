import { Routes, Route } from "react-router-dom";

// Layout
import PublicLayout from "./layouts/PublicLayout";

export const AppRouter = () => {
  return (
    <Routes>
      {/* Public layout routing */}
      <Route path="/" element={<PublicLayout />}>
      
      </Route>
    </Routes>
  );
};

