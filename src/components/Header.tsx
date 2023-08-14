import { Link } from 'react-router-dom';
import { useCart } from '../data/CartProvider';
import { CartData } from '../data/props';
import { useUser } from '../data/UserProvider';

export default function Header() {
  const { user, logout } = useUser();

  const customer = {
    _id: '12345',
  };
  const { cart } = useCart() as CartData;
  return (
    <header>
      <nav className="navbar">
        <h1>
          <a href="/" className="header__links">
            CEDI Mart
          </a>
        </h1>
        {user === undefined || user === null ? (
          <div>
            <button className="mx-2 hover:text-blue-600">
              <Link to="/login">Login</Link>
            </button>
            <button className="bg-black p-2 text-white mx-2 hover:text-yellow-600">
              <Link to="/signup">Signup</Link>
            </button>
          </div>
        ) : (
          <>
            {user !== null && (
              <>
                <div className="dropdown h-full">
                  <Link
                    to={'/users/' + String(user.user.username)}
                    className={'mx-2 hover:text-blue-600'}
                  >
                    {user.user.username}
                  </Link>
                  &nbsp;
                  <Link
                    to="/"
                    onClick={logout}
                    className={
                      'bg-black p-2 text-white mx-2 hover:text-yellow-600'
                    }
                  >
                    Logout
                  </Link>
                </div>
              </>
            )}
          </>
        )}
      </nav>
      <div>
        <form id="search_form">
          <input
            id="search_box"
            type="search"
            name="searchbox"
            placeholder="search movie"
          />
          <button id="search_btn" type="submit">
            search
          </button>
        </form>
        <p>
          {/* <img src={''} alt="cart" /> */}
          <Link to={`customer/${customer._id}/cart`}>
            <span>&#128722;</span>
            <span>{cart.length}</span>
          </Link>
        </p>
      </div>
    </header>
  );
}
