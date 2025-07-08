import { createContext, useContext } from "react";
import { CartItemsContextType } from ".";

export const TotalItemsContext = createContext<
  CartItemsContextType | undefined
>(undefined);

export const useTotalCartItems = (): CartItemsContextType => {
  const context = useContext(TotalItemsContext);
  if (!context) {
    throw new Error(
      "useTotalCartItems must be used within a TotalItemsProvider"
    );
  }
  return context;
};
