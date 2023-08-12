import { LegacyRef, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Product from '../components/Product';
import { useCart } from '../data/CartProvider';
import { useFlash } from '../data/FlashProvider';
import { CartData } from '../data/props';
import useItem from '../Hooks/useItem';
import { Modal } from './Modal';

export default function ConfirmScreen() {
  const [orderQuantity, setOrderQuantity] = useState<number>(1);
  const [toggleStock, settoggleStock] = useState<boolean>(false);

  const { addToCart } = useCart() as CartData;
  const { product } = useItem();
  const navigate = useNavigate();

  return (
    <Modal xtraclass={''}>
      {product === undefined ? (
        <p>Loading...</p>
      ) : product === null ? (
        <p>Something might have gone wrong</p>
      ) : (
        <>
          <Product
            isConfirm
            _id={product._id}
            name={product.name}
            price={product.price}
            quantity={product.quantity}
            category={product.category}
            photo={`../../images/${product.photo}`}
            sku={product.sku}
            isAvailable={product.isAvailable}
          />

          <p>
            <strong>quantity:</strong>
            <input
              type={'number'}
              min={1}
              max={product.quantity}
              onChange={(e) => {
                setOrderQuantity(parseInt(e.target.value));
              }}
            />
          </p>
          {(toggleStock || !product.isAvailable) && (
            <p>Oops! looks like product is sold out, check in later.</p>
          )}

          <button
            onClick={() => {
              if (product.quantity > 0 || !product.isAvailable) {
                addToCart(product, orderQuantity);
                navigate(`/product/${product._id}`);
              } else {
                // useFlash()
                settoggleStock(true);
              }
            }}
          >
            Confirm
          </button>
          <button
            onClick={() => {
              navigate(`/product/${product._id}`);
            }}
          >
            Cancel
          </button>
        </>
      )}
    </Modal>
  );
}
