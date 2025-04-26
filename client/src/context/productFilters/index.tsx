import React, { createContext, useState, useContext, ReactNode } from "react";

interface FilterProductsContextType {
  filter: string;
  updatedFilters: (category: string) => void;
}

const FilterProductsContext = createContext<
  FilterProductsContextType | undefined
>(undefined);

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

export const useProductFilters = (): FilterProductsContextType => {
  const context = useContext(FilterProductsContext);
  if (!context) {
    throw new Error(
      "useProductFilters must be used within a FilterProductsProvider"
    );
  }
  return context;
};
