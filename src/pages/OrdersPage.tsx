import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApi } from '../data/ApiProvider';
import { CartItem } from '../data/props';

export type Orders = {
  order_id: string;
  line_items: CartItem[];
  order_date: Date;
};
export default function OrdersPage() {
  const [orders, setOrders] = useState<Orders[] | null | undefined>(undefined);
  const navigate = useNavigate();
  const api = useApi();

  useEffect(() => {
    (async () => {
      const res = await api.get<Orders[]>('/customers/orders');
      if (res.ok) {
        setOrders(res.body);
      } else {
        setOrders(null);
      }
    })();
  }, [api]);
  return (
    <article className="flex p-8 flex-col justify-center items-center page-height">
      <h3 className='font-bold text-2xl p-2'>All Orders</h3>
      {/* orders to be tabulated here */}
      <>
        {orders === undefined ? (
          <p>loading...</p>
        ) : orders === null ? (
          <p>Sorry, something might have gone wrong</p>
        ) : (
          <>
            <ol>
              <li className={'flex flex-row justify-around items-center p-2 m-4 font-bold'}><span>Order ID</span> <span>Date</span></li>
              {orders && 
                orders.map((line) => (
                  <li key={line.order_id} className={'flex flex-row justify-between items-center p-2 m-4 mx-8'}>
                    <Link to={`/customer/cart/${line.order_id}`} className='mx-8'>
                      {line.order_id}
                    </Link>
                    <span className='mx-8 font-bold'>{new Date(line.order_date).toISOString()}</span>
                  </li>
                ))}
            </ol>
          </>
        )}
      </>
      <button
        onClick={() => {
          // cart to be cleared here
          navigate('/');
          // continue to order page
        }}
        className="m-1 p-1 text-white text-center font-bold bg-green-500 sm:w-full md:w-6/12"
      >
        Continue Shopping!
      </button>
    </article>
  );
}
