import { Dispatch, SetStateAction } from "react"

export interface ProductProp {
    _id?: string
    name: string
    price: number
    quantity: number
    category: string
    photo: string
    isDetail?: boolean
}

export interface cartItem {
    id: string
    quantity: number
    sku: []
  }

export interface CartData {
    cart: cartItem[]
    setCart: Dispatch<SetStateAction<cartItem[] | []>>;
  }