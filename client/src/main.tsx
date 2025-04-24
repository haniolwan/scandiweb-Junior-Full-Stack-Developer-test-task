import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { TotalItemsProvider } from "./context/cartItems/index.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TotalItemsProvider>
      <App />
    </TotalItemsProvider>
  </StrictMode>
);
