import { MutableRefObject, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../data/CartProvider';
import { useProducts } from '../data/ProductsProvider';
import { CartData, ProductProviderProps } from '../data/props';
import { useCustomer } from '../data/UserProvider';

export default function Header() {
  const { customer, logout } = useCustomer();
  const { products, setProducts } = useProducts() as ProductProviderProps;
  const searchRef = useRef() as MutableRefObject<HTMLInputElement>;

  const handlesearch = () => {
    if (products && searchRef.current) {
      const searchedItems = products.filter((p) =>
        p.name.includes(searchRef.current.value),
      );
      setProducts(searchedItems);
    }
  };

  const { cart } = useCart() as CartData;
  return (
    <header className="flex justify-center items-center">
      <h1 className="navbrand p-4">
        <Link to="/">CEDI Mart</Link>
      </h1>
      <nav className="navbar flex">
        <>
          {customer !== null && (
            <>
              <div className="nav-links">
                <NavLink to={'/'} className={'mx-2 hover:text-blue-600'}>
                  Products
                </NavLink>
                &nbsp;
                <NavLink
                  to={'/customer/cart/orders'}
                  className={'mx-2 hover:text-blue-600'}
                >
                  Orders
                </NavLink>
                &nbsp;
                <NavLink
                  to={'/users/' + String(customer.username)}
                  className={'mx-2 hover:text-blue-600'}
                >
                  {customer.username}
                </NavLink>
              </div>
            </>
          )}
        </>
      </nav>
      <div className="nav-links p-4">
        <div className="nav-links">
          <input
            type="search"
            name="searchbox"
            placeholder="search item"
            ref={searchRef}
          />
          <button
            className="bg-green-400 px-2 py-1 mx-2 text-white"
            onClick={handlesearch}
          >
            search
          </button>
        </div>
        <>
          {customer === undefined || customer === null ? (
            <div className="nav-links">
              <button className="mx-2 px-2 py-1 hover:text-blue-600">
                <Link to="/login">Login</Link>
              </button>
              <button className="bg-black px-2 py-1 text-white mx-2 hover:text-yellow-600">
                <Link to="/signup">Signup</Link>
              </button>
            </div>
          ) : (
            <div className="nav-links p-1">
              <button className="py-1 px-4 bg-orange-100 m-1">
                {/* <img src={''} alt="cart" /> */}
                <Link
                  to={`customer/${customer?._id}/cart`}
                  className={'flex flex-row'}
                >
                  <span>&#128722;</span>
                  <span className="mx-1">{cart.length}</span>
                </Link>
              </button>

              <button
                className={
                  'bg-black px-2 py-1 text-white mx-2 hover:text-yellow-600'
                }
                onClick={logout}
              >
                Logout
              </button>
            </div>
          )}
        </>
      </div>
    </header>
  );
}
