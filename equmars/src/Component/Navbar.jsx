import React, { useContext, useState, useEffect } from 'react';
import { Menu, ShoppingCart, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { authContext } from '../Context/AuthContext';
import { cartContext } from '../Context/CartContext';
import { wishListContext } from '../Context/WishListContext';

export default function Navbar() {
  const { token, setToken } = useContext(authContext);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { cart } = useContext(cartContext);
  const { wish } = useContext(wishListContext);

  const [isShaking, setIsShaking] = useState(false);

  // لما wish تتغير (تضاف عنصر) نشغل الهزة
  useEffect(() => {
    if (wish && wish.length > 0) {
      setIsShaking(true);
      const timer = setTimeout(() => setIsShaking(false), 500);
      return () => clearTimeout(timer);
    }
  }, [wish]);

  const hasWishItems = wish && wish.length > 0;

  const toggleMobile = () => setIsMobileOpen(!isMobileOpen);

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setIsMobileOpen(false);
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-slate-100 shadow-md py-3">
      <div className="container mx-auto flex justify-between items-center px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center text-2xl font-bold text-gray-800">
          <ShoppingCart className="text-green-400 w-7 h-7 mr-2" />
          FreshCart
        </Link>

        {/* Desktop Navigation */}
        {token ? (
          <div className="hidden md:flex items-center gap-6">
            <ul className="flex gap-4 items-center text-lg font-medium">
              <li><Link to="/Home" className="hoverLink">Home</Link></li>
              <li><Link to="/Product" className="hoverLink">Product</Link></li>
              <li><Link to="/Categories" className="hoverLink">Categories</Link></li>
              <li><Link to="/Brands" className="hoverLink">Brands</Link></li>
              <li><Link to="/AllOrders" className="hoverLink">AllOrders</Link></li>

              {/* WishList */}
              <li>
                <Link to="/wishlist" className="hoverLink">
                  <div className={`rounded-full p-1 transition-colors duration-300 ${hasWishItems ? 'bg-green-500' : 'bg-transparent'} ${isShaking ? 'shake' : ''}`}>
                    <Heart className={`w-6 h-6 ${hasWishItems ? 'text-white' : 'text-gray-700'}`} />
                  </div>
                </Link>
              </li>

              {/* Cart */}
              <li className="relative">
                <Link to="/cart" className="text-gray-700 hoverLink">
                  <ShoppingCart className="w-6 h-6" />
                  {cart?.numOfCartItems > 0 && (
                    <div className="bg-green-500 w-5 h-5 text-white text-xs font-bold flex items-center justify-center rounded-full absolute -top-2 -left-2">
                      {cart.numOfCartItems}
                    </div>
                  )}
                </Link>
              </li>
            </ul>
            <button onClick={logout} className="cursor-pointer text-red-600 font-medium hover:text-red-800">Logout</button>
          </div>
        ) : (
          <ul className="hidden md:flex gap-4 items-center text-lg font-medium">
            <li><Link to="/login" className="hoverLink">Login</Link></li>
            <li><Link to="/Register" className="hoverLink">Register</Link></li>
          </ul>
        )}

        {/* Mobile Icons + Menu */}
        <div className="flex items-center gap-4 md:hidden">
          {/* WishList */}
          <Link to="/wishlist" className="hoverLink">
            <div className={`rounded-full p-1 transition-colors duration-300 ${hasWishItems ? 'bg-green-500' : 'bg-transparent'} ${isShaking ? 'shake' : ''}`}>
              <Heart className={`w-6 h-6 ${hasWishItems ? 'text-white' : 'text-gray-700'}`} />
            </div>
          </Link>

          {/* Cart */}
          <div className="relative">
            <Link to="/cart" className="hoverLink text-gray-700">
              <ShoppingCart className="w-6 h-6" />
              {cart?.numOfCartItems > 0 && (
                <div className="bg-green-500 w-5 h-5 text-white text-xs font-bold flex items-center justify-center rounded-full absolute -top-2 -left-2">
                  {cart.numOfCartItems}
                </div>
              )}
            </Link>
          </div>

          {/* Menu Toggle */}
          <Menu className="cursor-pointer" onClick={toggleMobile} />
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${isMobileOpen ? 'max-h-96 opacity-100' : 'opacity-0 max-h-0'}`}>
        <ul className="flex flex-col gap-2 p-4 text-lg font-medium">
          {token ? (
            <>
              <li><Link to="/Home" className="hoverLink" onClick={() => setIsMobileOpen(false)}>Home</Link></li>
              <li><Link to="/Product" className="hoverLink" onClick={() => setIsMobileOpen(false)}>Product</Link></li>
              <li><Link to="/Categories" className="hoverLink" onClick={() => setIsMobileOpen(false)}>Categories</Link></li>
              <li><Link to="/Brands" className="hoverLink" onClick={() => setIsMobileOpen(false)}>Brands</Link></li>
              <li><Link to="/AllOrders" className="hoverLink" onClick={() => setIsMobileOpen(false)}>WishList</Link></li>
              <li><button onClick={logout} className="text-red-600 hover:text-red-800">Logout</button></li>
            </>
          ) : (
            <>
              <li><Link to="/login" className="hoverLink" onClick={() => setIsMobileOpen(false)}>Login</Link></li>
              <li><Link to="/Register" className="hoverLink" onClick={() => setIsMobileOpen(false)}>Register</Link></li>
            </>
          )}
        </ul>
      </div>  
    </div>
  );
}
