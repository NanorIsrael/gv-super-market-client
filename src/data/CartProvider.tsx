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
    () => (item: ProductProp, orderQuantity: number) => {
      // ensure item is not already added
      if (!item) {
        return;
      } else {
        const foundItem = cart.filter((p) => p.id === item._id);
        if (foundItem.length > 0) {
          if (foundItem[0].quantity !== orderQuantity) {
            const updatedItem = cart.filter((i) => {
              if (i.id === item._id) {
                i.quantity += orderQuantity;
              }
              return i;
            });
            const newCart = cart.filter((p) => p.id !== updatedItem[0].id);
            setCart([...newCart, ...updatedItem]);
            const updatedProducts: ProductProp[] = [];
            products?.forEach((p) => {
              if (p._id === item._id) {
                const updatedQuatity = item.quantity - orderQuantity;
                updatedProducts.push({ ...p, quantity: updatedQuatity });
              } else {
                updatedProducts.push(p);
              }
            });
            setProducts && setProducts(updatedProducts);
          }
          return;
        } else {
          const localCart: CartItem = {
            id: item._id!,
            quantity: orderQuantity,
            sku: item.sku!,
          };
          const cartLength = cart.length;

          setCart([...cart, localCart]);

          const updatedProducts: ProductProp[] = [];
          products?.forEach((p) => {
            if (p._id === item._id) {
              const updatedQuatity = item.quantity - orderQuantity;
              updatedProducts.push({ ...p, quantity: updatedQuatity });
            } else {
              updatedProducts.push(p);
            }
          });
          setProducts && setProducts(updatedProducts);
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
