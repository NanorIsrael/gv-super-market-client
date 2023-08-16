import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal } from '../components/Modal';
import { useApi } from '../data/ApiProvider';
import { useCart } from '../data/CartProvider';
import { useProducts } from '../data/ProductsProvider';
import { CartData, CartItem, ProductProp } from '../data/props';
import { useCustomer } from '../data/UserProvider';

export default function CheckOutPage() {
  const [error, setError] = useState(false);
  const { customer } = useCustomer();
  const { cart, setCart } = useCart() as CartData;
  const api = useApi();
  const navigate = useNavigate();
  const setProducts = useProducts()?.setProducts;

  const handleCheckout = async () => {
    if (cart.length > 0) {
      const res = await api.post<CartItem[], null>('/customers', cart);

      if (res.ok) {
        localStorage.setItem(`${customer?._id}`, '[]');
        setCart([]);
        const res = await api.get<{ products: ProductProp[] | null }>(
          '/products',
        );
        if (res.ok) {
          setProducts &&
            setProducts(res.body?.products as ProductProp[] | null);
        }
        navigate(`/customer/${customer?._id}/orders`);
      } else {
        setError(true);
      }
    } else {
      navigate('/');
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
