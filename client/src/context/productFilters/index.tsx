import React, { useState, ReactNode } from "react";
import { FilterProductsContext } from "./useProductFilters";
import { Category } from "../../helpers/types";

export interface FilterProductsContextType {
  filter: string;
  updatedFilters: (category: string) => void;
  categories: Category[];
  updateCategories: (category: Category[]) => void;
}

interface FilterProductsProviderProps {
  children: ReactNode;
}

export const FilterProductsProvider: React.FC<FilterProductsProviderProps> = ({
  children,
}) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [filter, setFilter] = useState<string>("all");

  const updatedFilters = (category: string) => {
    setFilter(category);
  };

  const updateCategories = (categories: Category[]) => {
    setCategories(categories);
  };

  return (
    <FilterProductsContext.Provider
      value={{ filter, updatedFilters, categories, updateCategories }}
    >
      {children}
    </FilterProductsContext.Provider>
  );
};
