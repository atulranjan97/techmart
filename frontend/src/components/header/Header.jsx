// Core Module
import { useState } from "react";
// External Module
import { Link, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoPerson } from "react-icons/io5";
import { IoPersonCircle } from "react-icons/io5";
import SearchBox from "../SearchBox";
import { CiSearch } from "react-icons/ci";
// import { RxHamburgerMenu } from "react-icons/rx";

// Custom Module
import NavDropdown from "../NavDropdown";
import { useLogoutMutation } from "../../slices/usersApiSlice";
import { logout } from "../../slices/authSlice";
import CartIcon from "./CartIcon";
import MobileDrawer from "./MobileDrawer";
import ProfileDrawer from "./ProfileDrawer";
import { resetCart } from "../../slices/cartSlice";

const Header = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const userInfo = useSelector((state) => state.auth.userInfo);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      dispatch(resetCart());
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <nav className="w-full bg-techmart-color shadow-md sticky top-0 z-50 lg:static">
        <div className="lg:max-w-7xl mx-auto px-2 lg:px-6 py-3">
          <div className="flex items-center justify-between">
            {/* Hamburger inside navbar */}
            <button
              onClick={() => setIsMobileOpen(true)}
              className="lg:hidden text-white"
            >
              <GiHamburgerMenu className="size-6" />
            </button>

            {/* Left - Logo */}
            <div className="text-xl font-bold text-white">
              <Link to={"/"}>TechMart</Link>
            </div>

            {/* Middle - Links (Desktop) */}
            <div className="hidden lg:flex space-x-8 text-white">
              <NavLink
                to={"/"}
                className={({ isActive }) =>
                  `border border-techmart-color rounded-md hover:border-gray-100 px-2 ${isActive ? "bg-techmart-dark" : ""}`
                }
              >
                Home
              </NavLink>
              <NavLink
                to={"/products"}
                className={({ isActive }) =>
                  `border border-techmart-color rounded-md hover:border-gray-100 px-2 ${isActive ? "bg-techmart-dark" : ""}`
                }
              >
                Products
              </NavLink>
              <NavLink
                to={"/contact"}
                className={({ isActive }) =>
                  `border border-techmart-color rounded-md hover:border-gray-100 px-2 ${isActive ? "bg-techmart-dark" : ""}`
                }
              >
                Contact
              </NavLink>
            </div>

            {/* Right - Auth (Mobile) */}
            <div className="flex items-center gap-3 lg:gap-4 mr-3">
              {/* Search (Desktop) */}
              <SearchBox className={"hidden md:block"} />
              {/* Search (Mobile) */}
              <CiSearch
                className="md:hidden text-white size-6"
                onClick={() => setIsSearchOpen((curr) => !curr)}
              />
              {userInfo ? (
                <>
                  {/* Cart */}

                  {/* Mobile Sign In */}
                  <button
                    onClick={() => setIsProfileOpen(true)}
                    className="lg:hidden text-white flex items-center gap-1 order-2"
                  >
                    <IoPersonCircle className="size-8" />
                    {userInfo.name.trim().split(/\s+/)[0]}
                  </button>

                  {/* Desktop Sign In */}
                  <div className=" hidden lg:flex items-center gap-1">
                    <IoPersonCircle className="size-8 text-white" />
                    <NavDropdown
                      title={userInfo.name.trim().split(/\s+/)[0]}
                      items={[
                        { label: "Profile", link: "/profile" },
                        { label: "Orders", link: "/myorders" },
                        // { label: "Saved Addresses", link: "/addresses" },
                        { label: "Logout", onClick: logoutHandler },
                      ]}
                    />
                  </div>

                  {userInfo.isAdmin && (
                    <Link
                      to={"/admin"}
                      className="text-white border block h-fit p-1 px-2 bg-techmart-darker rounded-xl text-sm"
                    >
                      Admin
                    </Link>
                  )}
                </>
              ) : (
                <Link
                  to={"/login"}
                  className="text-white flex items-center gap-1"
                >
                  <IoPersonCircle className="size-8" />
                  Sign In
                </Link>
              )}

              <CartIcon cartItems={cartItems} />
            </div>
          </div>
        </div>

        {isSearchOpen && (
          <div className="lg:hidden w-full px-1 my-1 sticky top-0 z-50 ">
            <SearchBox
              className=""
              isOpen={isSearchOpen}
              setIsOpen={setIsSearchOpen}
            />
          </div>
        )}
      </nav>

      {/* Mobile Drawer nav links */}
      <MobileDrawer isOpen={isMobileOpen} setIsOpen={setIsMobileOpen}>
        <ul className="flex flex-col gap-2">
          <NavLink
            to={"/"}
            className={({ isActive }) =>
              `p-2 ${isActive ? "bg-techmart-dark text-white" : ""}`
            }
          >
            <li>Home</li>
          </NavLink>
          <NavLink
            to={"/products"}
            className={({ isActive }) =>
              `p-2 ${isActive ? "bg-techmart-dark text-white" : ""}`
            }
          >
            <li>Products</li>
          </NavLink>
          <NavLink
            to={"/contact"}
            className={({ isActive }) =>
              `p-2 ${isActive ? "bg-techmart-dark text-white" : ""}`
            }
          >
            <li>Contacts</li>
          </NavLink>
        </ul>
      </MobileDrawer>

      <ProfileDrawer isOpen={isProfileOpen} setIsOpen={setIsProfileOpen} userInfo={userInfo}>
        <ul className="flex flex-col gap-3">
          <NavLink to={"/profile"} className={({isActive}) => `pl-2 ${isActive ? 'bg-techmart-color text-white p-2' : ''}`}>
            <li>Profile</li>
          </NavLink>

          <NavLink to={"/myorders"} className={({isActive}) => `pl-2 ${isActive ? 'bg-techmart-color text-white p-2' : ''}`}>
            <li>Orders</li>
          </NavLink>

          <button className="flex pl-2" onClick={logoutHandler}>
            Sign Out
          </button>
        </ul>
      </ProfileDrawer>
    </>
  );
};

export default Header;
