import { useNavigate } from 'react-router-dom';
import Product from '../components/Product';
import useItem from '../hooks/useItem';

export default function ProductDetail() {
  const { product } = useItem();
  const navigate = useNavigate();

  return (
    <article className="flex flex-col justify-center items-center p-4 page-height">
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
            isAvailable={product.isAvailable}
          />
          <button
            className="m-1 p-1 text-white text-center bg-black sm: w-full md:w-4/12"
            onClick={() => navigate(`confirm`)}
          >
            Buy
          </button>
          <button
            className="m-1 p-1 text-white text-center font-bold bg-green-500 sm: w-full md:w-4/12"
            onClick={() => navigate('/')}
          >
            Continue Shopping
          </button>
        </>
      )}
    </article>
  );
}
