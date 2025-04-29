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
  const [filter, setFilter] = useState<string>(() => {
    try {
      const storedItems = localStorage.getItem("product_filters");
      return storedItems ? JSON.parse(storedItems) : "all";
    } catch (error) {
      console.error("Failed to load cart from localStorage", error);
      return "all";
    }
  });

  const updatedFilters = (category: string) => {
    setFilter(category);
    window.localStorage.setItem("product_filters", JSON.stringify(category));
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
