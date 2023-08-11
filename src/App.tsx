import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import ApiProvider from './data/ApiProvider';
import CartProvider from './data/CartProvider';
import HomePage from './pages/HomePage';
import ProductDetail from './pages/Product';

function App() {
  return (
    <ApiProvider>
      <CartProvider>
        <div className="App">
          <Header />
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
                      <HomePage />
                      //  </PublicRoute>
                    }
                  />

                  <Route
                    path="/product/:id"
                    element={
                      //  <PublicRoute>
                      <ProductDetail />
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
      </CartProvider>
    </ApiProvider>
  );
}

export default App;
