// import { Dispatch, SetStateAction } from "react"

import { Dispatch, SetStateAction } from 'react';

export interface ProductProp {
  _id?: string;
  name: string;
  price: number;
  quantity: number;
  category: string;
  photo: string;
  isDetail?: boolean;
  sku?: string;
  isConfirm?: boolean;
}

export interface CartItem {
  id: string;
  quantity: number;
  sku: string;
}

export interface CartData {
  cart: CartItem[];
  addToCart: (item: ProductProp) => void;
}

export interface ProductProviderProps {
  products: ProductProp[] | null;
  setProducts: Dispatch<SetStateAction<ProductProp[] | null>>;
}
// Dispatch<SetStateAction<CartItem[] | []>>;
