// Core Modules
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// External Modules
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom'
import { Provider } from 'react-redux'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
// Custom Modules
import PrivateRoute from './components/PrivateRoute.jsx'
import './index.css'
import App from './App.jsx'
import HomePage from './pages/HomePage.jsx'
import ProductPage from './pages/ProductPage.jsx'
import store from './store.js'
import CartPage from './pages/CartPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import ShippingPage from './pages/ShippingPage.jsx'
import PaymentPage from './pages/PaymentPage.jsx'
import PlaceOrderPage from './pages/PlaceOrderPage.jsx'
import OrderPage from './pages/OrderPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      {/* public route */}
      <Route path='/' index={true} element={<HomePage />} />
      <Route path='/products/:id' element={<ProductPage />} />
      <Route path='/cart' element={<CartPage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />

      {/* protected route */}
      <Route path='' element={<PrivateRoute />}> 
        <Route path='/shipping' element={<ShippingPage />} />
        <Route path='/payment' element={<PaymentPage />} />
        <Route path='/placeorder' element={<PlaceOrderPage />} />
        <Route path='/order/:id' element={<OrderPage />} />
        <Route path='/profile' element={<ProfilePage />} />
      </Route>
    </Route>
  )
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store} >
      <PayPalScriptProvider deferLoading={true} >
        <RouterProvider router={router} />
      </PayPalScriptProvider>
    </Provider>
  </StrictMode>,
)
