import { useEffect, useState } from "react";
import Product from "../components/Product";
import { useApi } from "../data/ApiProvider";
import { ProductProp } from "../data/props";

interface QueryProducts {
  products: ProductProp[]
}
export default function Home() {

    const [products, setProducts] = useState<undefined | null | ProductProp[]>(undefined)
    const api = useApi()

    useEffect(() => {
      (async() => {
        const res = await api.get<QueryProducts>('/product')
        if (res.ok) {
          console.log(res.body)
          setProducts(res.body?.products)
        } else {
          setProducts(null)
        }
      })()
    }, [api])


    return (
        <article>
            <h2 className="hero">Welcome to CI Movies</h2>

            <section id="movies_container">  
            </section>
            <p className="center"><button hidden id="load_more" className="center">Load More</button></p>
            <section id="movies_search_container">  
            {
              products == null ? (
                <>
                  <p>Loading...</p>
                </>
              )
              :
              (
                <>
                  {
                    products && products.map((p) => <Product 
                    key={p._id}
                    name={p.name}
                    price={p.price}
                    quantity={p.quantity}
                    category={p.category}
                    photo={p.photo}
                  />
                  )}
                </>
              )
            }
            </section>
        </article>
    )
}