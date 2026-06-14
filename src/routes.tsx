import { Routes as RouterRoutes, Route } from "react-router";
import History from "./pages/History";
import Compare from "./pages/Compare";
import Favorites from "./pages/Favorites";
import Log from "./pages/Log";

const Routes = () => {
  return (
    <RouterRoutes>
      <Route index element={<History />} />
      <Route path="history" element={<History />} />
      <Route path="compare" element={<Compare />} />
      <Route path="favorites" element={<Favorites />} />
      <Route path="log" element={<Log />} />
    </RouterRoutes>
  );
};

export default Routes;
