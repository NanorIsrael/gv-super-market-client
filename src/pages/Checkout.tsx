import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal } from '../components/Modal';
import { useApi } from '../data/ApiProvider';
import { useCart } from '../data/CartProvider';
import { CartData, CartItem } from '../data/props';
import { useCustomer } from '../data/UserProvider';

export default function CheckOutPage() {
  const [error, setError] = useState(false);
  const { customer } = useCustomer();
  const { cart } = useCart() as CartData;
  const api = useApi();
  const navigate = useNavigate();

  const handleCheckout = async () => {
    const res = await api.post<CartItem[], null>('/products', cart);
    console.log('checkoutres', res.ok);

    if (res.ok) {
      navigate(`/customer/${customer?._id}/orders`);
    } else {
      setError(true);
    }
  };
  return (
    <Modal xtraclass={''}>
      <section>
        {error ? (
          <p>Something might have gone wrong. try again later</p>
        ) : (
          <>
            <h3> Orders are currently free</h3>

            <button onClick={handleCheckout}>Continue</button>
          </>
        )}
      </section>
    </Modal>
  );
}
