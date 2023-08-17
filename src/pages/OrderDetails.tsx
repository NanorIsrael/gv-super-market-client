import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Product from '../components/Product';
import { useApi } from '../data/ApiProvider';
import { useProducts } from '../data/ProductsProvider';
import { CartItem } from '../data/props';
import { Orders } from './OrdersPage';

export default function OderDetails() {
  const [orderCart, setOrderCart] = useState<CartItem[] | null | undefined>(
    undefined,
  );
  const products = useProducts()?.products;
  const api = useApi();
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      const res = await api.get<Orders | null>(`/customers/cart/${id}`);
      if (res.ok) {
        console.log('response', res.body);
        setOrderCart(res.body?.line_items);
      } else {
        setOrderCart(null);
      }
    })();
  }, [api, id]);

  const RenderCartItems = (item: CartItem) => {
    if (products) {
      return products?.map((p) =>
        p._id === item.product_id ? (
          <div key={p._id} className="p-8 m-3 cart-items ">
            <Product
              _id={p._id}
              name={p.name}
              price={p.price}
              quantity={p.quantity}
              sku={p.sku}
              category={p.category}
              photo={`../../images/${p.photo}`}
              isAvailable={p.isAvailable}
              isDetail
            />
          </div>
        ) : null,
      );
    }
  };

  return (
    <article className="flex flex-col justify-center items-center p-4 text-start page-height">
      <h2 className="font-extrabold text-xl m-1">Order Details!</h2>
      <section>
        <Link to={'/'}>
          <button className="m-1 p-1 text-white text-center font-bold bg-green-500 sm:w-full  ">
            Continue Shopping
          </button>
        </Link>
      </section>
      <section>
        {orderCart == null ? (
          <>
            <p>Loading...</p>
          </>
        ) : (
          <>
            {orderCart === undefined ? (
              <p>
                <strong>Sorry, something might have gone wrong.</strong>
              </p>
            ) : (
              orderCart && orderCart.map(RenderCartItems)
            )}
          </>
        )}
      </section>
    </article>
  );
}
