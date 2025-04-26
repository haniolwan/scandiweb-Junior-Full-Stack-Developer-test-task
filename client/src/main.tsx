import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { TotalItemsProvider } from "./context/cartItems/index.tsx";
import { FilterProductsProvider } from "./context/productFilters/index.tsx";
import App from "./App.tsx";
import "./index.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <FilterProductsProvider>
      <TotalItemsProvider>
        <App />
      </TotalItemsProvider>
    </FilterProductsProvider>
  </StrictMode>
);
