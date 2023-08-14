import {
  createContext,
  ReactElement,
  useContext,
  useMemo,
  useState,
} from 'react';
import { CartData, CartItem, ProductProp } from './props';

const CartContext = createContext<CartData | null>(null);
export default function CartProvider({ children }: { children: ReactElement }) {
  const initCart = localStorage.getItem('cart')
    ? (JSON.parse(localStorage.getItem('cart')!) as CartItem[])
    : [];
  console.log('cart from local', initCart);
  const [cart, setCart] = useState<CartItem[]>(initCart);
  //   const { products, setProducts } = useProducts() as ProductProviderProps;
  //   const flash = useFlash();

  //   const onError = useCallback(() => {
  //     flash &&
  //       flash('An unexpected error has occured, Please try again.', 'danger');
  //   }, [flash]);

  const addToCart = useMemo(
    () => (item: ProductProp, orderQuantity: number) => {
      // ensure item is not already added
      if (!item) {
        return;
      } else {
        const foundItem = cart.filter((p) => p.id === item._id);
        if (foundItem.length > 0) {
          if (foundItem[0].quantity !== orderQuantity) {
            cart.filter((i) => {
              if (i.id === item._id) {
                i.quantity = orderQuantity;
              }
              return i;
            });
            // const newCart = cart.filter((p) => p.id !== updatedItem[0].id);
            // setCart([...newCart, ...updatedItem]);
            // const updatedProducts: ProductProp[] = [];
            // products?.forEach((p) => {
            //   if (p._id === item._id) {
            //     const updatedQuatity = item.quantity - orderQuantity;
            //     updatedProducts.push({ ...p, quantity: updatedQuatity });
            //   } else {
            //     updatedProducts.push(p);
            //   }
            // });
            // setProducts && setProducts(updatedProducts);
            localStorage.setItem('cart', JSON.stringify([...cart]));
          }
          return;
        } else {
          const localCart: CartItem = {
            id: item._id!,
            quantity: orderQuantity,
            sku: item.sku!,
          };
          setCart([...cart, localCart]);
          localStorage.setItem(
            'cart',
            JSON.stringify([...cart, ...[localCart]]),
          );
          //   const updatedProducts: ProductProp[] = [];
          //   products?.forEach((p) => {
          //     if (p._id === item._id) {
          //       const updatedQuatity = item.quantity - orderQuantity;
          //       updatedProducts.push({ ...p, quantity: updatedQuatity });
          //     } else {
          //       updatedProducts.push(p);
          //     }
          //   });
          //   setProducts && setProducts(updatedProducts);
        }
      }
    },
    [cart],
  );

  return (
    <CartContext.Provider value={{ cart, addToCart, setCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  return useContext(CartContext);
};
