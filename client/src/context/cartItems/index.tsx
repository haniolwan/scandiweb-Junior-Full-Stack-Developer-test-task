import React, { createContext, useState, useContext, ReactNode } from "react";
import { CartItem, Product } from "../../helpers/types";

interface CartItemsContextType {
  displayCartItems: Product[]; // this for display product with choosing different attributes
  updateDisplayCartItems: (products: Product[]) => void;

  selectedCartItems: CartItem[];
  updateSelectedCartItems: (items: CartItem[]) => void; // change to new shape for api request
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
  const [displayCartItems, setDisplayCartItems] = useState<Product[]>([]);
  const [selectedCartItems, setSelectedCartItems] = useState<CartItem[]>([]);

  const updateDisplayCartItems = (items: Product[]) => {
    setDisplayCartItems(items);
  };

  const updateSelectedCartItems = (items: CartItem[]) => {
    setSelectedCartItems(items);
  };

  return (
    <TotalItemsContext.Provider
      value={{
        displayCartItems,
        updateDisplayCartItems,
        selectedCartItems,
        updateSelectedCartItems,
      }}
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
