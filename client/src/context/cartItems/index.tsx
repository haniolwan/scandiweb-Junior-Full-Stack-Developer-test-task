import React, { useState, ReactNode } from "react";
import { CartItem, Product } from "../../helpers/types";
import { TotalItemsContext } from "./useTotalCartItems";

export interface CartItemsContextType {
  openCart: boolean;
  setOpenCart: (open: boolean) => void;

  displayCartItems: Product[];
  updateDisplayCartItems: (products: Product[]) => void;

  selectedCartItems: CartItem[];
  updateSelectedCartItems: (items: CartItem[]) => void;
}

interface TotalItemsProviderProps {
  children: ReactNode;
}

export const TotalItemsProvider: React.FC<TotalItemsProviderProps> = ({
  children,
}) => {
  const [displayCartItems, setDisplayCartItems] = useState<Product[]>(() => {
    try {
      const storedItems = localStorage.getItem("cart_display_items");
      return storedItems ? JSON.parse(storedItems) : [];
    } catch {
      return [];
    }
  });
  const [selectedCartItems, setSelectedCartItems] = useState<CartItem[]>(() => {
    try {
      const storedItems = localStorage.getItem("cart_items");
      return storedItems ? JSON.parse(storedItems) : [];
    } catch (error) {
      console.error("Failed to load cart from localStorage", error);
      return [];
    }
  });

  const [openCart, setOpenCart] = useState(false);

  const updateDisplayCartItems = (items: Product[]) => {
    setDisplayCartItems(items);
    window.localStorage.setItem("cart_display_items", JSON.stringify(items));
  };

  const updateSelectedCartItems = (items: CartItem[]) => {
    setSelectedCartItems(items);
    window.localStorage.setItem("cart_items", JSON.stringify(items));
  };

  return (
    <TotalItemsContext.Provider
      value={{
        openCart,
        setOpenCart,
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
