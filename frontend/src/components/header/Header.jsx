// Core Module
import { useState } from "react";
// External Module
import { Link } from "react-router-dom";
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

            {/* Search (Mobile) */}
            {/* <CiSearch
              className="lg:hidden text-white size-6"
              onClick={() => setIsSearchOpen(curr => !curr)}
            /> */}

            {/* Search (Desktop) */}
            {/* <SearchBox className={"hidden lg:block"} /> */}

            {/* Middle - Links (Desktop) */}
            {/* <div className="hidden lg:flex space-x-8 text-white">
            <Link to={"/"} className="border border-techmart-color rounded-md hover:border-gray-100 px-2">Home</Link>
            <Link to={"#"} className="border border-techmart-color rounded-md hover:border-gray-100 px-2">Products</Link>
            <Link to={"#"} className="border border-techmart-color rounded-md hover:border-gray-100 px-2">Deals</Link>
            <Link to={"#"} className="border border-techmart-color rounded-md hover:border-gray-100 px-2">Contact</Link>
          </div> */}

            {/* Right - Auth (Mobile) */}
            <div className="flex items-center gap-3 lg:gap-4 mr-3">
              {/* Search (Desktop) */}
              <SearchBox className={"hidden lg:block"} />
              {/* Search (Mobile) */}
              <CiSearch
                className="lg:hidden text-white size-6"
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

      <MobileDrawer isOpen={isMobileOpen} setIsOpen={setIsMobileOpen}>
        <ul className="flex flex-col gap-3">
          <Link to={"/"}>
            <li>Home</li>
          </Link>
          <Link to={"#"}>
            <li>Products</li>
          </Link>
          <Link to={"#"}>
            <li>Deals</li>
          </Link>
          <Link to={"#"}>
            <li>Contacts</li>
          </Link>
        </ul>
      </MobileDrawer>

      <ProfileDrawer isOpen={isProfileOpen} setIsOpen={setIsProfileOpen}>
        <ul className="flex flex-col gap-3">
          <Link to={"/profile"}>
            <li>Profile</li>
          </Link>

          <button className="w-fit" onClick={logoutHandler}>
            Sign Out
          </button>
        </ul>
      </ProfileDrawer>
    </>
  );
};

export default Header;
