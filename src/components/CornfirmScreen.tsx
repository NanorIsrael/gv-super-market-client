import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Product from '../components/Product';
import { useCart } from '../data/CartProvider';
import { CartData } from '../data/props';
import useItem from '../Hooks/useItem';
import { Modal } from './Modal';

export default function ConfirmScreen() {
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
          />
          <button
            onClick={() => {
              addToCart(product);
              navigate(`/product/${product._id}`);
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
function usetSate(): [any, any] {
  throw new Error('Function not implemented.');
}
