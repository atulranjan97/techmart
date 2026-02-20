import { useEffect } from 'react';
// External modules(or packages)
import { useDispatch } from 'react-redux';
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import { logout } from './slices/authSlice';
// Custom components
import Header from "./components/header/Header";
import Footer from "./components/Footer";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {

    const expirationTime = localStorage.getItem("expirationTime");
    if (expirationTime) {
      const currentTime = new Date().getTime();

      if (currentTime > expirationTime) {
        dispatch(logout());
      }
    }
  }, [dispatch]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-200">
      <Header />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
      <ToastContainer />
    </div>
  );
};

export default App;
