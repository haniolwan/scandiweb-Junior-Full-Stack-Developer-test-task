import React, { createContext, useState, useContext, ReactNode } from "react";
import { Product } from "../../types";

interface CartItemsContextType {
  totalCartItems: Product[];
  updateTotalCartItems: (products: Product[]) => void;
}

const TotalItemsContext = createContext<CartItemsContextType | undefined>(
  undefined
);

interface TotalItemsProviderProps {
  children: ReactNode;
}

export const TotalItemsProvider: React.FC<TotalItemsProviderProps> = ({
  children,
}) => {
  const [totalCartItems, setTotalCartItems] = useState<Product[]>([]);

  const updateTotalCartItems = (items: Product[]) => {
    setTotalCartItems(items);
  };

  return (
    <TotalItemsContext.Provider
      value={{ totalCartItems, updateTotalCartItems }}
    >
      {children}
    </TotalItemsContext.Provider>
  );
};

export const useTotalCartItems = (): CartItemsContextType => {
  const context = useContext(TotalItemsContext);
  if (!context) {
    throw new Error(
      "useTotalCartItems must be used within a TotalItemsProvider"
    );
  }
  return context;
};
