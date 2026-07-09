import { FavoritesContextProvider } from "../contexts/FavoritesContext/FavoritesContext";
import { RateContextProvider } from "../contexts/RateContext";
import { LogsContextProvider } from "../contexts/LogsContext";
import { HashRouter } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

/**
 * This is used to wrap components that depend on (Context) Providers
 */
const AppWithProviders = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <HashRouter>
        <LogsContextProvider>
          <FavoritesContextProvider>
            <RateContextProvider>{children}</RateContextProvider>
          </FavoritesContextProvider>
        </LogsContextProvider>
      </HashRouter>
    </QueryClientProvider>
  );
};

export default AppWithProviders;
