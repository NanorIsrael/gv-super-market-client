import Product from '../components/Product';
import { useCart } from '../data/CartProvider';
import { CartData } from '../data/props';
import useItem from '../Hooks/useItem';

export default function ProductDetail() {
  const { addToCart } = useCart() as CartData;
  const { product } = useItem();

  return (
    <>
      {product === undefined ? (
        <p>Loading...</p>
      ) : product === null ? (
        <p>Something might have gone wrong</p>
      ) : (
        <>
          <Product
            isDetail
            _id={product._id}
            name={product.name}
            price={product.price}
            quantity={product.quantity}
            category={product.category}
            photo={`../images/${product.photo}`}
            sku={product.sku}
          />
          <button onClick={() => addToCart(product)}>Buy</button>
        </>
      )}
    </>
  );
}
