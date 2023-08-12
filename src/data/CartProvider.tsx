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
import { useProducts } from './ProductsProvider';
import { CartData, CartItem, ProductProp, ProductProviderProps } from './props';

const CartContext = createContext<CartData | null>(null);
export default function CartProvider({ children }: { children: ReactElement }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const { products, setProducts } = useProducts() as ProductProviderProps;
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
          console.log('here', cartLength);

          setCart([...cart, localCart]);

          if (cart.length + 1 !== cartLength) {
            const updatedProducts: ProductProp[] = [];
            products?.forEach((p) => {
              if (p._id === item._id) {
                const updatedQuatity = item.quantity - 1;
                updatedProducts.push({ ...p, quantity: updatedQuatity });
              } else {
                updatedProducts.push(p);
              }
            });
            setProducts && setProducts(updatedProducts);
          }
        }
      }
    },
    [cart, products, setProducts],
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
