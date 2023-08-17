import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import ConfirmScreen from './components/CornfirmScreen';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import ApiProvider from './data/ApiProvider';
import CartProvider from './data/CartProvider';
import ProductsProvider from './data/ProductsProvider';
import UserProvider, { useCustomer } from './data/UserProvider';
import Layout from './layout/Layout';
import Cart from './pages/Cart';
import CheckOutPage from './pages/Checkout';
import DashBoard from './pages/DashBoard';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import OderDetails from './pages/OrderDetails';
import OrdersPage from './pages/OrdersPage';
import ProductDetail from './pages/Product';
import RegistrationPageWithFlash from './pages/SignupPage';

function App() {
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
                    // <PublicRoute>
                    <RegistrationPageWithFlash />
                    /* </PublicRoute> */
                  }
                />
                <Route path="/" element={<HomePage />} />
                <Route
                  path="*"
                  element={
                    <PrivateRoute>
                      <Routes>
                        {/* <Route
                          path="/"
                          element={
                            // <PublicRoute>
                              <HomePage />
                            // </PublicRoute>
                          }
                        /> */}
                        <Route
                          path="/products/:id"
                          element={<ProductDetail />}
                        />
                        <Route
                          path="/products/:id/confirm"
                          element={<ConfirmScreen />}
                        />
                        <Route path={'customer/:id/cart'} element={<Cart />} />
                        <Route
                          path={`customer/:id/orders`}
                          element={<OrdersPage />}
                        />
                        <Route
                          path={`customer/:id/checkout`}
                          element={<CheckOutPage />}
                        />
                        <Route
                          path={`customer/cart/:id`}
                          element={<OderDetails />}
                        />
                        <Route
                          path={`admin/dashboard`}
                          element={<DashBoard />}
                        />
                        <Route path="*" element={<Navigate to="/" />} />
                      </Routes>
                    </PrivateRoute>
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
