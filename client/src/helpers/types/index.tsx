export interface Product {
  id: string;
  name: string;
  inStock: boolean;
  gallery: string[];
  description: string;
  category: string;
  attributes: AttributeSet[];
  prices: Price[];
  brand: string;
  __typename: string;
}

export interface CartItem {
  productId: string;
  selectedAttributes: {
    // same id different attributes
    [attributeName: string]: string;
  };
  quantity: number;
  price: number;
  currencyLabel: string;
}

export type Category = {
  id: string;
  name: string;
  __typename: "Category";
};

interface AttributeSet {
  id: string;
  name: string;
  type: string; // e.g., "text"
  items: Attribute[];
  __typename: string;
}

export interface Attribute {
  displayValue: string;
  value: string;
  id: string;
  __typename: string;
}

interface Price {
  amount: number;
  currency: Currency;
  __typename: string;
}

interface Currency {
  label: string; // e.g., "USD"
  symbol: string; // e.g., "$"
  __typename: string;
}
