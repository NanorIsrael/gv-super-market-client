import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Product from '../components/Product';
import { useApi } from '../data/ApiProvider';
import { useProducts } from '../data/ProductsProvider';
import { ProductProp, ProductProviderProps } from '../data/props';

export default function Home() {
  const {products, setProducts} = useProducts() as ProductProviderProps;

  const api = useApi();
  console.log('hello')
  useEffect(() => {
    (async () => {
      const res = await api.get<{ products: ProductProp[] | null }>(
        '/products',
      );
      if (res.ok) {
        setProducts(res.body?.products as ProductProp[] | null);
      } else {
        setProducts(null);
      }
    })();
  }, [api, setProducts]);
  return (
    <article className="flex flex-col justify-center items-center p-4 ">
      <h2 className="font-extrabold text-xl">Happy Shopping!</h2>

      <section className="p-4">
        {products === undefined ? (
          <>
            <p>Loading...</p>
          </>
        ) : products === null ? (
          <p>Oops!, something might have gone wrong, try again later</p>
        ) : (
          <div className='products'>
            {products &&
              products.map(
                (p) =>
                  p.isAvailable && (
                    <div key={p._id} className="p-4">
                      <Product
                        _id={p._id}
                        name={p.name}
                        price={p.price}
                        quantity={p.quantity}
                        category={p.category}
                        photo={`./images/${p.photo}`}
                        isAvailable={p.isAvailable}
                      />
                      <Link to={`/products/${p._id}`}>
                        <button
                          className="m-1 p-1 text-white text-center bg-black w-full rounded"
                          disabled={!p.isAvailable}
                        >
                          Buy
                        </button>
                      </Link>
                    </div>
                  ),
              )}
          </div>
        )}
      </section>
    </article>
  );
}
