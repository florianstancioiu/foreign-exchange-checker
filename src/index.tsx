import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { HashRouter } from "react-router";
import Routes from "./routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RateContextProvider } from "./contexts/RateContext";
import { FavoritesContextProvider } from "./contexts/FavoritesContext";
import { LogsContextProvider } from "./contexts/LogsContext";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <HashRouter>
        <LogsContextProvider>
          <FavoritesContextProvider>
            <RateContextProvider>
              <Routes />
            </RateContextProvider>
          </FavoritesContextProvider>
        </LogsContextProvider>
      </HashRouter>
    </QueryClientProvider>
  </StrictMode>,
);
