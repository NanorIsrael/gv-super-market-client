import { Link } from 'react-router-dom';
import Product from '../components/Product';
import { useCart } from '../data/CartProvider';
import { useProducts } from '../data/ProductsProvider';
import { CartData, CartItem, ProductProp } from '../data/props';
import { useCustomer } from '../data/UserProvider';

export default function Cart() {
  const { cart, setCart } = useCart() as CartData;
  const products = useProducts()?.products;
  const customer = useCustomer().customer;

  const handleCartItemRemove = (item: ProductProp) => {
    const updatedCart = cart.filter((prod) => prod.id !== item._id);
    setCart(updatedCart);
    localStorage.setItem(
      `${customer?._id as string}`,
      JSON.stringify([...updatedCart]),
    );
  };

  const RenderCartItems = (item: CartItem) =>
    products?.map((p) =>
      p._id === item.id ? (
        <div key={p._id}>
          <Product
            _id={p._id}
            name={p.name}
            price={p.price}
            quantity={item.quantity}
            sku={item.sku}
            category={p.category}
            photo={`../../images/${p.photo}`}
            isAvailable={p.isAvailable}
            isDetail
          />
          <div>
            <button onClick={() => handleCartItemRemove(p)}>Remove</button>
            <Link to={`/products/${p._id}/confirm`}>
              <button>Edit</button>
            </Link>
          </div>
        </div>
      ) : null,
    );

  return (
    <article>
      <h2 className="hero">Happy Shopping!</h2>
      <section>
        <Link to={'/'}>
          <button>Continue Shoping</button>
        </Link>
      </section>
      <section id="movies_search_container">
        {cart == null ? (
          <>
            <p>Loading...</p>
          </>
        ) : (
          <>
            {cart && cart.length === 0 ? (
              <p>
                <strong>No items in cart</strong>
              </p>
            ) : (
              cart.map(RenderCartItems)
            )}
          </>
        )}
      </section>
      <section>
        <Link to={`/customer/${customer?._id}/checkout`}>
          {cart.length > 0 && <button>Checkout</button>}
        </Link>
      </section>
    </article>
  );
}
