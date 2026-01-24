import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { GiShoppingCart, GiHamburgerMenu } from "react-icons/gi";
import { IoPerson } from "react-icons/io5";
// import { RxHamburgerMenu } from "react-icons/rx";

const Header = () => {
  const [open, setOpen] = useState(false);
  const { cartItems } = useSelector((state) => state.cart )
  // console.log(cartItems)

  return (
    <nav className="w-full bg-techmart-color shadow-md sticky top-0 md:static">
      <div className="lg:max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-12 md:h-16">
          
          {/* Hamburger */}
          <button
            className="md:hidden text-white"
            onClick={() => setOpen(!open)}
          >
            <GiHamburgerMenu />
          </button>

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
          <div className="flex">

            <div className="flex">
              <Link to={"/cart"} className="text-white flex items-center">
                  <GiShoppingCart className="size-7 md:size-9 mx-auto" />
                <span className="text-sm hidden">Cart</span>
              </Link>
              {cartItems.length > 0 && (
                <div className="bg-teal-700 text-white text-xs font-medium w-5 h-5 flex items-center justify-center rounded-full border border-white relative right-2 bottom-2">
                  {cartItems.reduce((acc, curr) => acc + curr.qty, 0)}
                </div>
              )}
            </div>

            <Link to={"/login"} className="text-white flex items-center">
              <IoPerson className="size-5 md:size-7 mx-auto" />
              <span className="hidden text-sm">Sign In</span>
            </Link>

          </div>


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
