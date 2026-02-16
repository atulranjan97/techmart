// components/Header/Header.jsx
import { useState, useEffect } from 'react';
import { GiShoppingCart, GiHamburgerMenu } from "react-icons/gi";
import { FaUserCircle } from "react-icons/fa";
import { MdAdminPanelSettings } from "react-icons/md";
import UserDropdown from './UserDropdown';
import AdminDropdown from './AdminDropdown';
import MobileMenu from './MobileMenu';

const Header = () => {
  // State for user authentication (you can replace this with your actual auth logic)
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john@example.com",
    isAuthenticated: true
  });
  
  const [isAdmin, setIsAdmin] = useState(true); // Set to true to see admin features
  const [cartCount, setCartCount] = useState(3); // Example cart count
  
  // Dropdown states
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showAdminDropdown, setShowAdminDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  // Handle clicks outside dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showUserDropdown || showAdminDropdown || showMobileMenu) {
        setShowUserDropdown(false);
        setShowAdminDropdown(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showUserDropdown, showAdminDropdown, showMobileMenu]);

  // Navigation links for desktop
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "Categories", href: "/categories" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <a href="/" className="text-2xl font-bold text-gray-800">
                Shop<span className="text-blue-600">Ease</span>
              </a>
              
              {/* Desktop Navigation */}
              <nav className="hidden lg:flex ml-10 space-x-8">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                ))}
              </nav>
            </div>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center space-x-6">
              {/* Cart Link */}
              <div className="relative">
                <a 
                  href="/cart" 
                  className="flex items-center text-gray-700 hover:text-blue-600 transition-colors duration-200"
                >
                  <GiShoppingCart className="text-2xl" />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                  <span className="ml-2 font-medium">Cart</span>
                </a>
              </div>

              {/* Admin Link (only visible if admin) */}
              {isAdmin && (
                <div className="relative">
                  <button
                    onClick={() => {
                      setShowAdminDropdown(!showAdminDropdown);
                      setShowUserDropdown(false);
                    }}
                    className="flex items-center text-gray-700 hover:text-blue-600 transition-colors duration-200"
                  >
                    <MdAdminPanelSettings className="text-2xl" />
                    <span className="ml-2 font-medium">Admin</span>
                  </button>
                  <AdminDropdown 
                    isOpen={showAdminDropdown} 
                    onClose={() => setShowAdminDropdown(false)} 
                  />
                </div>
              )}

              {/* User/Auth Link */}
              <div className="relative">
                {user.isAuthenticated ? (
                  <button
                    onClick={() => {
                      setShowUserDropdown(!showUserDropdown);
                      setShowAdminDropdown(false);
                    }}
                    className="flex items-center text-gray-700 hover:text-blue-600 transition-colors duration-200"
                  >
                    <FaUserCircle className="text-2xl" />
                    <span className="ml-2 font-medium">{user.name.split(' ')[0]}</span>
                  </button>
                ) : (
                  <a 
                    href="/login" 
                    className="flex items-center text-gray-700 hover:text-blue-600 transition-colors duration-200"
                  >
                    <FaUserCircle className="text-2xl" />
                    <span className="ml-2 font-medium">Login/Sign Up</span>
                  </a>
                )}
                <UserDropdown 
                  isOpen={showUserDropdown} 
                  onClose={() => setShowUserDropdown(false)}
                  user={user}
                  isAdmin={isAdmin}
                />
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center space-x-4">
              <a 
                href="/cart" 
                className="relative text-gray-700"
              >
                <GiShoppingCart className="text-2xl" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </a>
              
              <button
                onClick={() => setShowMobileMenu(true)}
                className="p-2 rounded-md text-gray-700 hover:bg-gray-100"
              >
                <GiHamburgerMenu className="text-2xl" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu 
        isOpen={showMobileMenu} 
        onClose={() => setShowMobileMenu(false)}
        user={user.isAuthenticated ? user : null}
        isAdmin={isAdmin}
      />
    </>
  );
};

export default Header;