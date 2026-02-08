import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Product from './pages/Products'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import Wishlist from './pages/Wishlist'
import UserDetails from './pages/UserDetails'
import AddressDetails from './pages/AddressDetails';
import { EcommerceProvider } from './context/EcommerceContext';
import "react-toastify/dist/ReactToastify.css"
import { ToastContainer, toast } from 'react-toastify';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>
  },
  {
    path: "/products/:searchQuery",
    element: <Product/>
  },
  {
    path: "/productsDetails/:productId",
    element: <ProductDetails/>
  },
  {
    path: "/cart",
    element: <Cart/>
  },
  {
    path: "/wishlist",
    element: <Wishlist/>
  },
  {
    path: "/user",
    element: <UserDetails/>
  },
  {
    path: "/address/:addressId",
    element: <AddressDetails/>
  },
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <EcommerceProvider>
    <RouterProvider router={router} />
    <ToastContainer position="top-center"  autoClose={3000} />
  </EcommerceProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
