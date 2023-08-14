import { useNavigate } from 'react-router-dom';
import Product from '../components/Product';
import useItem from '../hooks/useItem';

export default function ProductDetail() {
  const { product } = useItem();
  const navigate = useNavigate();

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
            isAvailable={product.isAvailable}
          />
          <button onClick={() => navigate(`confirm`)}>Buy</button>
          <button onClick={() => navigate('/')}>Contiue Shoping</button>
        </>
      )}
    </>
  );
}
