import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Product from '../components/Product';
import { useCart } from '../data/CartProvider';
import { CartData } from '../data/props';
import useItem from '../hooks/useItem';
import { Modal } from './Modal';

export default function ConfirmScreen() {
  const [toggleStock, settoggleStock] = useState<boolean>(false);

  const { cart, addToCart } = useCart() as CartData;
  const { product } = useItem();
  const navigate = useNavigate();
  const itemInCart = cart.filter((p) => p.product_id === product?._id);
  const [orderQuantity, setOrderQuantity] = useState<number>(1);

  return (
    <Modal xtraclass={''}>
      {product === undefined ? (
        <p>Loading...</p>
      ) : product === null ? (
        <p>Something might have gone wrong</p>
      ) : (
        <div className="flex flex-col justify-center items-center p-4 text-start">
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

          <p className="flex flex-row w-full">
            <strong className="text-start">quantity:</strong>
            <input
              className="w-8/12 mx-2  p-0 text-black rounded-none"
              type={'number'}
              min={1}
              max={product.quantity}
              defaultValue={itemInCart.length > 0 ? itemInCart[0]?.quantity : 1}
              onChange={(e) => {
                setOrderQuantity(parseInt(e.target.value));
              }}
            />
          </p>
          {(toggleStock || !product.isAvailable) && (
            <p>Oops! looks like product is sold out, check in later.</p>
          )}

          <button
            className="m-1 p-1 text-white text-center bg-black w-full"
            onClick={() => {
              if (product.quantity > 0 || !product.isAvailable) {
                addToCart(product, orderQuantity);
                navigate(-1);
                // window.history.back()
              } else {
                // useFlash()
                settoggleStock(true);
              }
            }}
          >
            Confirm
          </button>
          <button
            className="m-1 p-1 text-black text-center bg-white text-black w-full"
            onClick={() => {
              navigate(-1);
            }}
          >
            Cancel
          </button>
        </div>
      )}
    </Modal>
  );
}
