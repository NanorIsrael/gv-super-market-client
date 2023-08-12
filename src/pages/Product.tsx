import { Navigate, useNavigate } from 'react-router-dom';
import ConfirmScreen from '../components/CornfirmScreen';
import Product from '../components/Product';
import { useCart } from '../data/CartProvider';
import { CartData } from '../data/props';
import useItem from '../Hooks/useItem';

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
