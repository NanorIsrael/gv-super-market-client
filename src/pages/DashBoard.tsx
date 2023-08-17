import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Modal } from '../components/Modal';
import { useApi } from '../data/ApiProvider';
import { useCart } from '../data/CartProvider';
import { useProducts } from '../data/ProductsProvider';
import {
  CartData,
  CartItem,
  ProductProp,
  ProductProviderProps,
} from '../data/props';
import { useCustomer } from '../data/UserProvider';
import Product from '../components/Product';

export default function DashBoard() {
  const [error, setError] = useState(false);
  const { customer } = useCustomer();
  const { cart, setCart } = useCart() as CartData;
  const api = useApi();
  const navigate = useNavigate();
  const { products, setProducts } = useProducts() as ProductProviderProps;
    console.log(products)
  const handleCheckout = async () => {};
  const handleCartItemRemove = (item: ProductProp) => {
    const updatedCart = cart.filter((prod) => prod.product_id !== item._id);
    setCart(updatedCart);
    localStorage.setItem(
      `${customer?._id as string}`,
      JSON.stringify([...updatedCart]),
    );
  };
  const RenderCartItems = () => {}

  return (
    <article className="flex flex-col justify-center items-center p-4 text-start page-height">
      <h2 className="font-extrabold text-xl m-1">Happy Shopping!</h2>
      <section>
        <Link to={'/'}>
          <button className="m-1 p-1 text-white text-center font-bold bg-green-500 w-full">
            Add new product
          </button>
        </Link>
      </section>

      <section className="m-4">
        {products === undefined ? (
          <>
            <p>Loading...</p>
          </>
        ) : products === null ? (
          <p>Something might have gone wrong. try again later</p>
        ) : (
          <>{
            products?.map((p) => (
                <div key={p._id} className="cart-items">
                  <Product
                    name={p.name}
                    price={p.price}
                    quantity={p.quantity}
                    sku={p.sku}
                    category={p.category}
                    photo={`../../images/${p.photo}`}
                    isAvailable={p.isAvailable}
                    isDetail
                  />
                  <div className="flex flex-row">
                    <Link to={`/products/${p._id}/confirm`}>
                      <button className="m-1 p-1 text-white text-center font-bold bg-green-500 w-full">
                        Edit
                      </button>
                    </Link>
                    <button
                      className="my-1 mx-2 p-1 text-white text-center font-bold bg-red-400 w-6/12 md: h-8 w-full"
                      onClick={() => handleCartItemRemove(p)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
            ))
          }
          </>
        )}
      </section>

    </article>
  );
}
