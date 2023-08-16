import {
  createContext,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from 'react';

import { useApi } from './ApiProvider';
import { ProductProp, ProductProviderProps } from './props';

const ProductsContext = createContext<ProductProviderProps | null>(null);
export default function ProductsProvider({
  children,
}: {
  children: ReactElement;
}) {
  // const flash = useFlash();
  console.log('called')
  const [products, setProducts] = useState<ProductProp[] | null>([]);
  const api = useApi();

  useEffect(() => {
    (async () => {
      const res = await api.get<{ products: ProductProp[] | null }>(
        '/products',
      );
      if (res.ok) {
        setProducts(res.body?.products as ProductProp[] | null);
      } else {
        setProducts(null);
      }
    })();
  }, [api]);

  // const onError = useCallback(() => {
  //   flash &&
  //     flash('An unexpected error has occured, Please try again.', 'danger');
  // }, [flash]);

  return (
    <ProductsContext.Provider value={{ products, setProducts }}>
      {children}
    </ProductsContext.Provider>
  );
}

export const useProducts = () => {
  return useContext(ProductsContext);
};
