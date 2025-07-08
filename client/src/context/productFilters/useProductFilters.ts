import { createContext, useContext } from "react";
import { FilterProductsContextType } from ".";

export const FilterProductsContext = createContext<
  FilterProductsContextType | undefined
>(undefined);

export const useProductFilters = (): FilterProductsContextType => {
  const context = useContext(FilterProductsContext);
  if (!context) {
    throw new Error(
      "useProductFilters must be used within a FilterProductsProvider"
    );
  }
  return context;
};
