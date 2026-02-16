// components/Header/UserDropdown.jsx
import React from 'react';
import { FaSignOutAlt, FaUser, FaCog } from "react-icons/fa";
import { GiShoppingCart } from "react-icons/gi";

const UserDropdown = ({ isOpen, onClose, user, isAdmin }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200"
      onMouseLeave={onClose}
    >
      <div className="px-4 py-2 border-b border-gray-100">
        <p className="text-sm font-semibold text-gray-800">{user?.name || "User"}</p>
        <p className="text-xs text-gray-500">{user?.email}</p>
      </div>
      
      <div className="py-1">
        <a 
          href="/profile" 
          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          <FaUser className="mr-3" />
          My Profile
        </a>
        <a 
          href="/orders" 
          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          <GiShoppingCart className="mr-3" />
          My Orders
        </a>
        {isAdmin && (
          <a 
            href="/admin" 
            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            <FaCog className="mr-3" />
            Admin Dashboard
          </a>
        )}
        <div className="border-t border-gray-100 my-1"></div>
        <button 
          onClick={() => console.log('Logout clicked')}
          className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
        >
          <FaSignOutAlt className="mr-3" />
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default UserDropdown;