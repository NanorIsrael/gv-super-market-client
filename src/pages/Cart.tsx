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
    const updatedCart = cart.filter((prod) => prod.product_id !== item._id);
    setCart(updatedCart);
    localStorage.setItem(
      `${customer?._id as string}`,
      JSON.stringify([...updatedCart]),
    );
  };

  const RenderCartItems = (item: CartItem) =>
    products?.map((p) =>
      p._id === item.product_id ? (
        <div key={p._id} className="cart-items">
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
          <div className="flex flex-row">
            <Link to={`/products/${p._id}/confirm`}>
              <button className="m-1 p-1 text-white text-center font-bold bg-green-500 w-full">
                Edit
              </button>
            </Link>
            <button
              className="my-1 mx-2 p-1 text-white text-center font-bold bg-red-400 w-6/12 md: h-8 w-full"
              onClick={() => handleCartItemRemove(p)}
            >
              Remove
            </button>
          </div>
        </div>
      ) : null,
    );

  return (
    <article className="flex flex-col justify-center items-center p-4 text-start page-height">
      <h2 className="font-extrabold text-xl m-1">Happy Shopping!</h2>
      <section>
        <Link to={'/'}>
          <button className="m-1 p-1 text-white text-center font-bold bg-green-500 w-full">
            Continue Shoping
          </button>
        </Link>
      </section>

      <section className="m-4">
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
      <section className="m-1 p-1 flex justify-center w-full">
        <Link
          to={`/customer/${customer?._id}/checkout`}
          className={
            'checkout-btn text-white text-center font-bold bg-green-500 py-3 round'
          }
        >
          {cart.length > 0 && (
            <button className="m-1 text-white rounded text-center font-bold bg-green-500">
              Checkout
            </button>
          )}
        </Link>
      </section>
    </article>
  );
}
