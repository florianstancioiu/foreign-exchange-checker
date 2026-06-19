import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router";
import Routes from "./routes";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter basename="/foreign-exchange-checker">
      <Routes />
    </BrowserRouter>
  </StrictMode>,
);
