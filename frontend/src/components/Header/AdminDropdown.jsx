// components/Header/AdminDropdown.jsx
import React from 'react';
import { MdAdminPanelSettings } from "react-icons/md";

const AdminDropdown = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const adminLinks = [
    { name: "Dashboard", href: "/admin/dashboard" },
    { name: "Products", href: "/admin/products" },
    { name: "Orders", href: "/admin/orders" },
    { name: "Users", href: "/admin/users" },
    { name: "Settings", href: "/admin/settings" },
  ];

  return (
    <div 
      className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200"
      onMouseLeave={onClose}
    >
      <div className="px-4 py-2 border-b border-gray-100">
        <p className="text-sm font-semibold text-gray-800 flex items-center">
          <MdAdminPanelSettings className="mr-2" />
          Admin Panel
        </p>
      </div>
      
      <div className="py-1">
        {adminLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            {link.name}
          </a>
        ))}
      </div>
    </div>
  );
};

export default AdminDropdown;