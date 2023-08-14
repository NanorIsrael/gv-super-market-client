import { useNavigate } from 'react-router-dom';
import { Modal } from '../components/Modal';

export default function CheckOutPage() {
  const customer = {
    _id: '12345',
  };
  const navigate = useNavigate();
  return (
    <Modal xtraclass={''}>
      <section>
        <h3> Orders are currently free</h3>

        <button
          onClick={() => {
            // cart to be cleared here
            navigate(`/customer/${customer._id}/orders`);
            // continue to order page
          }}
        >
          Continue
        </button>
      </section>
    </Modal>
  );
}
