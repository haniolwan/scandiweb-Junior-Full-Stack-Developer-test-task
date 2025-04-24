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

interface AttributeSet {
  id: string;
  name: string;
  type: string; // e.g., "text"
  items: Attribute[];
  __typename: string;
}

interface Attribute {
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
