import { Routes as RouterRoutes, Route } from "react-router";
import AppLayout from "./layouts/AppLayout";

import History from "./pages/History/History";
import Compare from "./pages/Compare/Compare";
import Favorites from "./pages/Favorites/Favorites";
import Log from "./pages/Log/Log";

const Routes = () => {
  return (
    <RouterRoutes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<History />} />
        <Route path="history" element={<History />} />
        <Route path="compare" element={<Compare />} />
        <Route path="favorites" element={<Favorites />} />
        <Route path="log" element={<Log />} />
      </Route>
    </RouterRoutes>
  );
};

export default Routes;
