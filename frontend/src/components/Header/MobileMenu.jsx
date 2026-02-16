// components/Header/MobileMenu.jsx
import React from 'react';
import { GiShoppingCart } from "react-icons/gi";
import { MdAdminPanelSettings } from "react-icons/md";

const MobileMenu = ({ isOpen, onClose, user, isAdmin }) => {
  if (!isOpen) return null;

  const mobileLinks = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "Categories", href: "/categories" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <div className="lg:hidden fixed inset-0 z-50">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />
      
      {/* Menu Panel */}
      <div className="absolute right-0 top-0 h-full w-64 bg-white shadow-xl">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-800">Menu</h3>
            <button
              onClick={onClose}
              className="p-2 rounded-md hover:bg-gray-100"
            >
              ✕
            </button>
          </div>
          
          {user ? (
            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <p className="font-medium text-gray-800">{user.name}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
          ) : (
            <div className="mt-4 space-y-2">
              <a
                href="/login"
                className="block w-full px-4 py-2 text-center bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Login
              </a>
              <a
                href="/signup"
                className="block w-full px-4 py-2 text-center border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
              >
                Sign Up
              </a>
            </div>
          )}
        </div>

        <div className="p-4">
          <h4 className="font-medium text-gray-500 mb-2">Navigation</h4>
          <nav className="space-y-1">
            {mobileLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block py-2 px-3 rounded-md hover:bg-gray-100 text-gray-700"
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <h4 className="font-medium text-gray-500 mb-2">Account</h4>
            <nav className="space-y-1">
              <a
                href="/cart"
                className="flex items-center py-2 px-3 rounded-md hover:bg-gray-100 text-gray-700"
              >
                <GiShoppingCart className="mr-3" />
                Cart (3)
              </a>
              {user && (
                <>
                  <a
                    href="/profile"
                    className="block py-2 px-3 rounded-md hover:bg-gray-100 text-gray-700"
                  >
                    My Profile
                  </a>
                  <a
                    href="/orders"
                    className="block py-2 px-3 rounded-md hover:bg-gray-100 text-gray-700"
                  >
                    My Orders
                  </a>
                </>
              )}
              {isAdmin && (
                <a
                  href="/admin"
                  className="flex items-center py-2 px-3 rounded-md hover:bg-gray-100 text-gray-700"
                >
                  <MdAdminPanelSettings className="mr-3" />
                  Admin Panel
                </a>
              )}
              {user && (
                <button
                  onClick={() => console.log('Logout clicked')}
                  className="w-full text-left py-2 px-3 rounded-md hover:bg-gray-100 text-red-600"
                >
                  Sign Out
                </button>
              )}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;