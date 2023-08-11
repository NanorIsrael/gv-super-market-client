import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import db from './db.json'


interface ProductProp {
  id: number
  name: string
  price: number
  quantity: number
  category: string
  photo: string
}
function App() {

  const [products, setProducts] = useState<null | ProductProp[]>(null)

  useEffect(() => {
      setProducts(db.products)
  }, [])
  return (
    <div className="App">
       <header>
        <nav>
           <h1><a href="/" className="header__links">CI Moviez</a></h1>
        </nav>
        <form id="search_form">
            <input id="search_box" type="search" name="searchbox" placeholder="search movie"/>
            <button id="search_btn" type="submit">search</button>
        </form>
      </header>
      <h2 className="hero">Welcome to CI Movies</h2>
    <article>
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
              {products.map((p) => (
                <figure key={p.id}>
                  <img src={logo} alt="" width={100} height={100}/>
                       <figcaption>
                         <p><strong>item:</strong> {p.name}</p>
                         <p><strong>price:</strong> {p.price} </p>
                         <p><strong>quantity:</strong> {p.quantity}</p>
                         <p><strong>category:</strong> {p.category}</p>
                       </figcaption>
                </figure>
              ))}
            </>
          )
        }
          

        </section>
    </article>
          <footer className="footer">
              <p>
                  <span className="nowrap">Copyright &copy;</span>
                  <span className="nowrap">GraceValley Technologies</span>
              </p>
          </footer>
    </div>
  );
}

export default App;
