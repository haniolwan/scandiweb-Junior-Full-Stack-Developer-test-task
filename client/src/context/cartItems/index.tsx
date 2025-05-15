import React, { createContext, useState, useContext, ReactNode } from "react";
import { CartItem, Product } from "../../helpers/types";

interface CartItemsContextType {
  openCart: boolean;
  setOpenCart: (open: boolean) => void; // this for open and close cart

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
  const [displayCartItems, setDisplayCartItems] = useState<Product[]>(() => {
    try {
      const storedItems = localStorage.getItem("cart_display_items");
      return storedItems ? JSON.parse(storedItems) : [];
    } catch (error) {
      console.error("Failed to load cart from localStorage", error);
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

export const useTotalCartItems = (): CartItemsContextType => {
  const context = useContext(TotalItemsContext);
  if (!context) {
    throw new Error(
      "useTotalCartItems must be used within a TotalItemsProvider"
    );
  }
  return context;
};
