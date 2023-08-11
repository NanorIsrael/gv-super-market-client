import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useProducts } from '../data/ProductsProvider';
import { ProductProp } from '../data/props';

export default function useItem() {
  const [product, setProduct] = useState<ProductProp | undefined | null>(
    undefined,
  );
  const products= useProducts()?.products
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      if (id && products) {
        const res = products.filter((item) => item._id === id);
        if (res) {
          setProduct(res[0]);
        } else {
          setProduct(null);
        }
      }
    })();
  }, [id, products]);

  return {
    product,
    setProduct,
  };
}
