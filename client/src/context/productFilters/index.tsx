import React, { useState, ReactNode } from "react";
import { FilterProductsContext } from "./useProductFilters";

export interface FilterProductsContextType {
  filter: string;
  updatedFilters: (category: string) => void;
}

interface FilterProductsProviderProps {
  children: ReactNode;
}

export const FilterProductsProvider: React.FC<FilterProductsProviderProps> = ({
  children,
}) => {
  const [filter, setFilter] = useState<string>("all");

  const updatedFilters = (category: string) => {
    setFilter(category);
  };

  return (
    <FilterProductsContext.Provider value={{ filter, updatedFilters }}>
      {children}
    </FilterProductsContext.Provider>
  );
};
