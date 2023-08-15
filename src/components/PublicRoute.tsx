import { useCustomer } from '../data/UserProvider';
import { Navigate } from 'react-router-dom';
import { ReactElement } from 'react';

export default function PublicRoute({ children }: { children: ReactElement }) {
  const { customer } = useCustomer();

  if (customer === undefined) {
    return null;
  } else if (customer) {
    return <Navigate to="/" />;
  } else {
    return children;
  }
}
