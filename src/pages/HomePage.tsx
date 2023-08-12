import { Link } from 'react-router-dom';
import Product from '../components/Product';
import { useProducts } from '../data/ProductsProvider';
import { ProductProp } from '../data/props';

export default function Home() {
  const products = useProducts()?.products;
  console.log(products);

  return (
    <article>
      <h2 className="hero">Happy Shopping!</h2>

      <section id="movies_container"></section>
      <p className="center">
        <button hidden id="load_more" className="center">
          Load More
        </button>
      </p>
      <section id="movies_search_container">
        {products == null ? (
          <>
            <p>Loading...</p>
          </>
        ) : (
          <>
            {products &&
              products.map((p) => (
                <div key={p._id}>
                  <Product
                    _id={p._id}
                    name={p.name}
                    price={p.price}
                    quantity={p.quantity}
                    category={p.category}
                    photo={`./images/${p.photo}`}
                    isAvailable={p.isAvailable}
                  />
                  <Link to={`/product/${p._id}`}>
                    <button>Buy</button>
                  </Link>
                </div>
              ))}
          </>
        )}
      </section>
    </article>
  );
}
