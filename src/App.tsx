import { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import ApiProvider from './data/ApiProvider';
import { cartItem } from './data/props';
import HomePage from './pages/HomePage';
import ProductDetail from './pages/Product';

function App() {
const [cart, setCart] = useState<cartItem[]>([])
// const cartSize = Object.key

  return (
    <ApiProvider>
    <div className="App">
       <header>
        <nav>
           <h1><a href="/" className="header__links">CEDI Mart</a></h1>
        </nav>
        <form id="search_form">
            <input id="search_box" type="search" name="searchbox" placeholder="search movie"/>
            <button id="search_btn" type="submit">search</button>
        </form>
        <p>
          <img src={''} alt="cart"/>
          <span>{cart.length}</span>
        </p>
      </header>
      <Routes>      
         <Route
              path="*"
              element={ 
                // <PrivateRoute>
                   <Routes>
                        <Route 
                          path="/"
                          element={
                            //  <PublicRoute>
                              <HomePage cart={cart} setCart={setCart}/>
                            //  </PublicRoute>
                          }
                        /> 

                    <Route 
                      path="/product/:id"
                      element={
                        //  <PublicRoute>
                          <ProductDetail cart={cart} setCart={setCart}/>
                        //  </PublicRoute>
                      }
                    />
                    <Route path="*" element={<Navigate to="/" />} />
                  </Routes>
                  // </PrivateRoute>
              }
            />
      </Routes> 
          <footer className="footer">
              <p>
                  <span className="nowrap">Copyright &copy;</span>
                  <span className="nowrap">GraceValley Technologies</span>
              </p>
          </footer>
    </div>
     </ApiProvider>
  );
}

export default App;
