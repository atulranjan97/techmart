// Core Module
import { useState } from "react";
// External Module
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GiShoppingCart, GiHamburgerMenu } from "react-icons/gi";
import { IoPerson } from "react-icons/io5";
// import { RxHamburgerMenu } from "react-icons/rx";

// Custom Module
import NavDropdown from "./NavDropdown";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";



const Header = () => {
  const [open, setOpen] = useState(false);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const userInfo = useSelector((state) => state.auth.userInfo);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [ logoutApiCall ] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/login');
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <nav className="w-full bg-techmart-color shadow-md sticky top-0 lg:static">
      <div className="lg:max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-12 md:h-16">
          
          {/* Hamburger */}
          <button
            className="lg:hidden text-white"
            onClick={() => setOpen(!open)}
          >
            <GiHamburgerMenu />
          </button>

          {/* Left - Logo */}
          <div className="text-lg md:text-xl font-bold text-white">
            <Link to={'/'}>TechMart</Link>
          </div>

          {/* Middle - Links (Desktop) */}
          <div className="hidden lg:flex space-x-8 text-white">
            <Link to={"/"} className="border border-techmart-color rounded-md hover:border-gray-100 px-2">Home</Link>
            <Link to={"/products"} className="border border-techmart-color rounded-md hover:border-gray-100 px-2">Products</Link>
            <Link to={"/deals"} className="border border-techmart-color rounded-md hover:border-gray-100 px-2">Deals</Link>
            <Link to={"/contact"} className="border border-techmart-color rounded-md hover:border-gray-100 px-2">Contact</Link>
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
              { userInfo ? (
                // <NavDropdown name={userInfo.name} />
                <NavDropdown 
                  title={userInfo.name}
                  items={[
                    { label: "Profile", link: "/profile" },
                    { label: "Logout", onClick: logoutHandler },
                  ]}
                />
              ) : (
                <Link to={"/login"} className="text-white flex items-center">
                  <IoPerson className="size-5 md:size-7 mx-auto" />
                  <span className="text-sm">Sign In</span>
                </Link>
              )}

          </div>


        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="lg:hidden px-6 pb-4 space-y-3 text-white">
          <Link to={"/"} className="block" onClick={() => setOpen(false)}>Home</Link>
          <Link to={"/products"} className="block" onClick={() => setOpen(false)}>Products</Link>
          <Link to={"/deals"} className="block" onClick={() => setOpen(false)}>Deals</Link>
          <Link to={"/contact"} className="block" onClick={() => setOpen(false)}>Contact</Link>

          <hr />

          <Link to={"/login"} className="block font-semibold" onClick={() => setOpen(false)}>Sign In</Link>
        </div>
      )}
    </nav>
  );
};

export default Header;
