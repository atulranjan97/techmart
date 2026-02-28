// Core Modules
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// External Modules
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import { Provider } from "react-redux";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
// Custom Modules
import "./index.css";
import App from "./App.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import AdminRoute from "./components/AdminRoute.jsx";
import HomePage from "./pages/HomePage.jsx";
import ProductsPage from "./pages/ProductsPage.jsx";
import ProductDetailsPage from "./pages/ProductDetailsPage.jsx";
import store from "./store.js";
import CartPage from "./pages/CartPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import ShippingPage from "./pages/ShippingPage.jsx";
import PaymentPage from "./pages/PaymentPage.jsx";
import PlaceOrderPage from "./pages/PlaceOrderPage.jsx";
import OrderPage from "./pages/OrderPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import OrderListPage from "./pages/admin/OrderListPage.jsx";
import ProductListPage from "./pages/admin/ProductListPage.jsx";
import ProductFormPage from "./pages/admin/ProductFormPage.jsx";
import UserListPage from "./pages/admin/UserListPage.jsx";
import UserEditPage from "./pages/admin/UserEditPage.jsx";
import AdminPage from "./pages/admin/AdminPage.jsx";
import DashboardPage from "./pages/admin/DashboardPage.jsx";
import { ToastContainer } from "react-toastify";
import ContactPage from "./pages/ContactPage.jsx";
import MyOrdersPage from "./pages/MyOrdersPage.jsx"

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />}>
        {/* public route */}
        <Route index element={<HomePage />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="products/search/:keyword" element={<ProductsPage />} />
        <Route path="products/page/:pageNumber" element={<ProductsPage />} />
        <Route path="search/:keyword/page/:pageNumber" element={<HomePage />} />
        <Route path="products/:id" element={<ProductDetailsPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="contact" element={<ContactPage />} />

        {/* protected route */}
        <Route element={<PrivateRoute />}>
          <Route path="shipping" element={<ShippingPage />} />
          <Route path="payment" element={<PaymentPage />} />

          <Route path="placeorder">
            <Route index element={<PlaceOrderPage />} />
            <Route path=":id" element={<PlaceOrderPage />} />
          </Route>

          <Route path="order/:id" element={<OrderPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="myorders" element={<MyOrdersPage />} />
          {/* <Route path="addresses" element={<AddressesPage />} /> */}
        </Route>
      </Route>

      {/* Admin Routes */}
      <Route element={<AdminRoute />}>
        <Route path="/admin" element={<AdminPage />}>
          <Route index element={<DashboardPage />} />

          <Route path="orderlist" element={<OrderListPage />} />
          <Route path="orderlist/:page" element={<OrderListPage />} />

          <Route path="productlist">
            <Route index element={<ProductListPage />} />
            <Route path=":pageNumber" element={<ProductListPage />} />
          </Route>

          <Route path="product">
            <Route path="create" element={<ProductFormPage />} />
            <Route path=":id/edit" element={<ProductFormPage />} />
          </Route>

          <Route path="userlist" element={<UserListPage />} />
          <Route path="user/:id/edit" element={<UserEditPage />} />
          <Route path="order/:id" element={<OrderPage />} />
        </Route>
      </Route>
    </>,
  ),
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PayPalScriptProvider deferLoading={true}>
        <ToastContainer position="top-right" className="z-99999!" />
        <RouterProvider router={router} />
      </PayPalScriptProvider>
    </Provider>
  </StrictMode>,
);
