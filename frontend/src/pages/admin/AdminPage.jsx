import React, { useState } from "react";
import { Link, NavLink, ScrollRestoration, useLocation, useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { logout } from "../../slices/authSlice";
import { useDispatch, } from "react-redux";
import { useLogoutMutation } from "../../slices/usersApiSlice";

const AdminPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();

  const { pathname } = useLocation();
  const getTitle = () => {
    let title = "Dashboard";
    if (pathname.includes("productlist")) {
      title = "Products";
    }
    if (pathname.includes("userlist")) {
      title = "Users";
    }
    if (pathname.includes("orderlist") || pathname.includes("order")) {
      title = "Orders";
    }
    return title;
  };

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-techmart-darker text-white p-6
          transform transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:static lg:translate-x-0
        `}
      >
        <Link to={"/admin"}>
          <h2 className="text-2xl font-bold mb-8">Techmart | Admin</h2>
        </Link>

        <nav className="space-y-3">
          <NavLink
            to={"/admin"}
            onClick={() => setSidebarOpen(false)}
            // className="block px-4 py-2 text-lg font-semibold rounded hover:bg-techmart-dark transition border"
            className={({isActive}) => `block px-4 py-2 text-lg font-semibold rounded ${isActive ? '' : 'hover:bg-techmart-color '}`}
          >
            Dashboard
          </NavLink>
          <NavLink
            to={"/admin/productlist"}
            onClick={() => setSidebarOpen(false)}
            // className="block px-4 py-2 rounded hover:bg-techmart-dark transition"
            className={({isActive}) => `block px-4 py-2 rounded ${isActive ? 'bg-techmart-dark' : 'hover:bg-techmart-dark'}`}
          >
            Products
          </NavLink>
          <NavLink
            to={"/admin/userlist"}
            onClick={() => setSidebarOpen(false)}
            // className="block px-4 py-2 rounded hover:bg-techmart-dark transition"
            className={({isActive}) => `block px-4 py-2 rounded ${isActive ? 'bg-techmart-dark' : 'hover:bg-techmart-dark'}`}
          >
            Users
          </NavLink>
          <NavLink
            to={"/admin/orderlist"}
            onClick={() => setSidebarOpen(false)}
            // className="block px-4 py-2 rounded hover:bg-techmart-dark transition"
            className={({isActive}) => `block px-4 py-2 rounded ${isActive ? 'bg-techmart-dark' : 'hover:bg-techmart-dark'}`}
          >
            Orders
          </NavLink>
          <button
            onClick={logoutHandler}
            className="hidden lg:block bg-red-600 text-white px-4 py-2 ml-3 rounded hover:bg-red-700 cursor-pointer"
          >
            Logout
          </button>
        </nav>
      </aside>

      {/* Main Content Wrapper */}
      <div className="flex-1 flex flex-col w-full">
        {/* Top Navbar */}
        <header className="bg-white shadow px-6 py-3 flex items-center justify-between">
          {/* Hamburger (Mobile Only) */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-2xl"
          >
            ☰
          </button>

          <h1 className="text-xl font-semibold">{getTitle()}</h1>
          <div className="flex gap-2">
            <Link
              to={"/"}
              className="bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-700 cursor-pointer"
            >
              View Store
            </Link>
            <button
              onClick={logoutHandler}
              className="lg:hidden bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 cursor-pointer"
            >
              Logout
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="p-6 space-y-6">
          <ScrollRestoration />
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminPage;
