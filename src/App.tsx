import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import ConfirmScreen from './components/CornfirmScreen';
import PublicRoute from './components/PublicRoute';
import ApiProvider from './data/ApiProvider';
import CartProvider from './data/CartProvider';
import ProductsProvider from './data/ProductsProvider';
import UserProvider from './data/UserProvider';
import Layout from './layout/Layout';
import Cart from './pages/Cart';
import CheckOutPage from './pages/Checkout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import OrdersPage from './pages/OrdersPage';
import ProductDetail from './pages/Product';
import RegistrationPageWithFlash from './pages/SignupPage';

function App() {
  const customer = {
    _id: '12345',
  };
  return (
    <ApiProvider>
      <UserProvider>
        <ProductsProvider>
          <CartProvider>
            <Layout>
              <Routes>
                <Route
                  path="/login"
                  element={
                    <PublicRoute>
                      <LoginPage />
                    </PublicRoute>
                  }
                />
                <Route
                  path="/signup"
                  element={
                    <PublicRoute>
                      <RegistrationPageWithFlash />
                    </PublicRoute>
                  }
                />
                <Route
                  path="/"
                  element={
                    <PublicRoute>
                      <HomePage />
                    </PublicRoute>
                  }
                />
                <Route
                  path="*"
                  element={
                    // <PrivateRoute>

                    <Routes>
                      <Route
                        path="/product/:id"
                        element={
                          //  <PublicRoute>
                          <ProductDetail />
                          //  </PublicRoute>
                        }
                      />
                      <Route
                        path="/product/:id/confirm"
                        element={
                          //  <PublicRoute>
                          <ConfirmScreen />
                          //  </PublicRoute>
                        }
                      />
                      <Route
                        path={`customer/${customer._id}/cart`}
                        element={
                          //  <PublicRoute>
                          <Cart />
                          //  </PublicRoute>
                        }
                      />
                      <Route
                        path={`customer/${customer._id}/orders`}
                        element={
                          //  <PublicRoute>
                          <OrdersPage />
                          //  </PublicRoute>
                        }
                      />
                      <Route
                        path={`customer/${customer._id}/checkout`}
                        element={
                          //  <PublicRoute>
                          <CheckOutPage />
                          //  </PublicRoute>
                        }
                      />
                      <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                    // </PrivateRoute>
                  }
                />
              </Routes>
            </Layout>
          </CartProvider>
        </ProductsProvider>
      </UserProvider>
    </ApiProvider>
  );
}

export default App;
