import {
  createContext,
  ReactElement,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import useItem from '../Hooks/useItem';
import { useFlash } from './FlashProvider';
import { CartData, CartItem, ProductProp } from './props';

const CartContext = createContext<CartData | null>(null);
export default function CartProvider({ children }: { children: ReactElement }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const { setProduct } = useItem();
  const flash = useFlash();

  const onError = useCallback(() => {
    flash &&
      flash('An unexpected error has occured, Please try again.', 'danger');
  }, [flash]);

  const addToCart = useMemo(
    () => (item: ProductProp) => {
      // ensure item is not already added
      if (!item) {
        return;
      } else {
        const searchItem = cart.filter((p) => p.id === item._id);
        if (searchItem.length > 0) {
          return;
        } else {
          const localCart: CartItem = {
            id: item._id!,
            quantity: 1,
            sku: item.sku!,
          };

          const cartLength = cart.length;
          setCart(() => [...cart, localCart]);
          if (cart.length !== cartLength) {
            setProduct({ ...item, quantity: item.quantity - 1 });
          }
        }
      }
    },
    [cart, setProduct],
  );

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  return useContext(CartContext);
};
