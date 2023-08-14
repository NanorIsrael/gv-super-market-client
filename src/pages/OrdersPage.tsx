import { useNavigate } from 'react-router-dom';

export default function OrdersPage() {
  const navigate = useNavigate();
  return (
    <article>
      <h3>All Orders</h3>
      {/* orders to be tabulated here */}
      <button
        onClick={() => {
          // cart to be cleared here
          navigate('/');
          // continue to order page
        }}
      >
        Continue
      </button>
    </article>
  );
}
