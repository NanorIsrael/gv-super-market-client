import { useCustomer } from '../data/UserProvider';
import { Navigate, useLocation } from 'react-router-dom';
import { ReactElement } from 'react';

export default function PrivateRoute({ children }: { children: ReactElement }) {
  const { customer } = useCustomer();
  const location = useLocation();

  if (customer === undefined) {
    return null;
  } else if (customer) {
    return children;
  } else {
    const url = location.pathname + location.search + location.hash;
    return <Navigate to="/login" state={{ next: url }} />;
  }
}
