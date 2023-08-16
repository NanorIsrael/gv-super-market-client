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
  isAvailable: boolean;
}

export interface CartItem {
  product_id: string;
  quantity: number;
  sku: string;
}

export interface CartData {
  cart: CartItem[];
  setCart: Dispatch<React.SetStateAction<CartItem[]>>;
  addToCart: (item: ProductProp, orderQuantity: number) => void;
}

export interface ProductProviderProps {
  products: ProductProp[] | null;
  setProducts: Dispatch<SetStateAction<ProductProp[] | null>>;
}
// Dispatch<SetStateAction<CartItem[] | []>>;
export type ErrorType = {
  [key: string]: string;
};
