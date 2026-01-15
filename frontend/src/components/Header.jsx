import { useState } from "react";
import { Link } from "react-router-dom";
import { GiShoppingCart, GiHamburgerMenu } from "react-icons/gi";
import { IoPerson } from "react-icons/io5";
// import { RxHamburgerMenu } from "react-icons/rx";

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full bg-teal-800 shadow-md sticky top-0 md:static">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-12 md:h-16">
          
          {/* Left - Logo */}
          <div className="text-lg md:text-xl font-bold text-white">
            <Link to={'/'}>TechMart</Link>
          </div>

          {/* Middle - Links (Desktop) */}
          <div className="hidden md:flex space-x-6 text-white">
            <Link to={"/"} className="hover:text-black">Home</Link>
            <Link to={"/products"} className="hover:text-black">Products</Link>
            <Link to={"/deals"} className="hover:text-black">Deals</Link>
            <Link to={"/contact"} className="hover:text-black">Contact</Link>
          </div>

          {/* Right - Auth (Desktop) */}
          <div className="hidden md:flex space-x-4">
            <Link to={"/cart"} className="text-white hover:text-black">
              <GiShoppingCart />Cart
            </Link>
            <Link to={"/login"} className="text-white hover:text-black">
              <IoPerson />Sign In
            </Link>
          </div>

          {/* Hamburger */}
          <button
            className="md:hidden text-white"
            onClick={() => setOpen(!open)}
          >
            <GiHamburgerMenu />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden px-6 pb-4 space-y-3 text-white">
          <Link to={"/"} className="block">Home</Link>
          <Link to={"/products"} className="block">Products</Link>
          <Link to={"/deals"} className="block">Deals</Link>
          <Link to={"/contact"} className="block">Contact</Link>

          <hr />

          <Link to={"/login"} className="block font-semibold">Sign In</Link>
        </div>
      )}
    </nav>
  );
};

export default Header;
