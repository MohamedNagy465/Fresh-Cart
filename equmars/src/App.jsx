import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './Component/Layout';
import Home from './Pages/Home';
import Product from './Pages/Product';
import Categories from './Pages/Categories';
import Brands from './Pages/Brands';
import Login from './Pages/ECHO/Login/Login';
import Register from './Pages/ECHO/Register/Register';
import Notfound from './Pages/Notfound';
import { Toaster } from 'react-hot-toast';
import ProtectedRouters from './ProtectedRouters/ProtectedRouters';
import AuthContextProvider from './Context/AuthContext';
import LoginProtected from './ProtectedRouters/LoginProtected';
import Forget from './Pages/ECHO/Forget/Forget';
import ProductDatels from './Pages/ProductDatels';
import Cart from './Pages/Cart';
import CartContextProvider from './Context/CartContext';
import VerifyCode from './Pages/ECHO/verifyCode/VerifyCode';
import ResetPassword from './Pages/ECHO/ResetPassword';
import BrandDetail from './Pages/BrandDetail';
import WishList from './Pages/WishList';
import WishListContextProvider from './Context/WishListContext';
import WishItem from './Component/WishItem';
import AllOrders from './Pages/AllOrders';
import CatogerySlider from './Component/CatogerySlider';
import MainSlider from './Component/MainSlider';

import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import CatogeryDatils from './Pages/ECHO/CatogeryDatils';
import Card from './Component/Card';
import {  QueryClient, QueryClientProvider } from '@tanstack/react-query';

function App() {

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  let routers = createBrowserRouter([
    {
      path: "/", element: <Layout />, children: [
        { index: true, element: <ProtectedRouters><Home /></ProtectedRouters> },
        { path: "Home", element: <ProtectedRouters><Home /></ProtectedRouters> },
        { path: "Product", element: <ProtectedRouters><Product /></ProtectedRouters> },
        { path: "Card", element: <ProtectedRouters><Card /></ProtectedRouters> },
        { path: "AllOrders", element: <ProtectedRouters><AllOrders /></ProtectedRouters> },
        { path: "ProductDatels/:id", element: <ProtectedRouters><ProductDatels /></ProtectedRouters> },
        { path: "cart", element: <ProtectedRouters><Cart /></ProtectedRouters> },
        { path: "wishList", element: <ProtectedRouters><WishList /></ProtectedRouters> },
        { path: "wishItem", element: <ProtectedRouters><WishItem /></ProtectedRouters> },
        { path: "CatogerySlider", element: <ProtectedRouters><CatogerySlider /></ProtectedRouters> },
        { path: "MainSlider", element: <ProtectedRouters><MainSlider /></ProtectedRouters> },
        { path: "Categories", element: <ProtectedRouters><Categories /></ProtectedRouters> },
        { path: "CatogeryDatels/:id", element: <ProtectedRouters><CatogeryDatils /></ProtectedRouters> },
        { path: "Brands", element: <ProtectedRouters><Brands /></ProtectedRouters> },
        { path: "BrandDetails/:id", element: <ProtectedRouters><BrandDetail /></ProtectedRouters> },
        { path: "login", element: <LoginProtected><Login /></LoginProtected> },
        { path: "Register", element: <LoginProtected><Register /></LoginProtected> },
        { path: "forget", element: <LoginProtected><Forget /></LoginProtected> },
        { path: "verifyCode", element: <LoginProtected><VerifyCode /></LoginProtected> },
        { path: "resetPassword", element: <LoginProtected><ResetPassword /></LoginProtected> },
        { path: "*", element: <Notfound /> },
      ]
    }
  ]);
  let client= new QueryClient()
  return (
    <>
    <QueryClientProvider client={client}>
        <AuthContextProvider>
        <CartContextProvider>
          <WishListContextProvider>
            <RouterProvider router={routers} />
            <Toaster />
          </WishListContextProvider>
        </CartContextProvider>
      </AuthContextProvider>
    </QueryClientProvider>
    </>
  )
}

export default App
