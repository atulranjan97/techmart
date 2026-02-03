// Core Module
import { useState, useEffect } from "react";
// External Module
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
// Custom Module
import { useRegisterMutation } from "../slices/usersApiSlice";
import Loader from "../components/Loader";
import { setCredentials } from "../slices/authSlice";

// We still gonna set the credentials coz remember, when we register, we want them to be logged in after, so we already took care of that on the backend. It'll register and it will set the HTTP only cookie

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // useLoginMutation returns an array with two elements:
  // 1. mutationFunction - function to trigger the mutation
  // 2. resultObject - contains isLoading, isError, etc.
  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);
  // `useSelector` takes in a function, pass in the state and we want the auth part of our state

  const { search } = useLocation();
  const sp = new URLSearchParams(search);   // sp for search params
  const redirect = sp.get('redirect') || '/';

  // console.log(search)
  // console.log(sp)
  // console.log(redirect)

  useEffect(() => {
    // if there is userInfo in localStorage then navigate to whatever that redirect is
    if (userInfo) {
        navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Password do not match');
      return;
    } else {
      try {
          // Call the mutation function with the data
          console.log(name, email, password);
          const res = await register({ name, email, password }).unwrap();  // .unwrap() gives us the actual response or throws an error

          dispatch(setCredentials({...res, }));
          navigate(redirect);
      } catch (err) {
        toast.error(err?.data?.message || err.error) 
      }
    }
  };

  return (
      <div className="flex max-w-7xl p-6 mx-auto">
        <div className="w-full max-w-md bg-white p-8 mx-auto border border-slate-300">

          <h2 className="text-2xl font-semibold mb-2">Welcome</h2>
          <p className="text-gray-600 mb-6">Sign Up</p>

          <form className="space-y-4" onSubmit={submitHandler}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Enter name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Enter email"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Enter password"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">Confirm password</label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Enter password"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-techmart-color text-white py-2 rounded-md hover:bg-techmart-dark transition"
            >
              Sign up
            </button>

            { isLoading && <Loader />}
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-gray-600">Already have an account?</span>{" "}
            <Link to={redirect ? `/login?redirect=${redirect}` : '/login'} className="font-medium text-black">
              Login
            </Link>
          </div>

        </div>
      </div>
  );
};

export default RegisterPage;
