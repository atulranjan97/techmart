// External Modules
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return userInfo ? <Outlet /> : <Navigate to={"/login"} replace />;
};

export default PrivateRoute;

// Outlet is basically what we want to return if we're logged in, if there's a user because it'll just put out whatever page we're trying to load.
// if we're not logged in then we're gonna use the navigate component to basically just redirect us
// adding `replace` to replace any past history
