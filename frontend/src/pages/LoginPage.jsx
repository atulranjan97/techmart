// Core Module
import { useState, useEffect } from "react";
// External Module
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
// Custom Module
import { useLoginMutation } from "../slices/usersApiSlice";
import Loader from "../components/Loader";
import { setCredentials } from "../slices/authSlice";


const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // useLoginMutation returns an array with two elements:
  // 1. mutationFunction - function to trigger the mutation
  // 2. resultObject - contains isLoading, isError, etc.
  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);
  // `useSelector` takes in a function, pass in the state and we want the auth part of our state

  const { search } = useLocation();
  const sp = new URLSearchParams(search);   // sp for search params
  const redirect = sp.get('redirect') || '/';
  console.log(redirect);

  // http://localhost:3000/login?redirect=/shipping
  // console.log('http://localhost:3000/login?redirect=/shipping');
  // console.log(search);  // ?redirect=/shipping
  // console.log(sp);  // URLSearchParams {...}  
  // console.log(sp.get('redirect'))   // /shipping

  // http://localhost:3000/login 
  // console.log('http://localhost:3000/login')
  // console.log(search);  //
  // console.log(sp);  // URLSearchParams {...}  
  // console.log(sp.get('redirect'))   // null

  useEffect(() => {
    // if there is userInfo in localStorage then navigate to whatever that redirect is
    if (userInfo) {
        navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
        // Call the mutation function with the data
        const res = await login({ email, password }).unwrap();  // .unwrap() gives us the actual response or throws an error
        // login() returns a promise, so we're going to add on this .unwrap which will basically extract or unwrap that resolved value from the promise

        dispatch(setCredentials({...res, }));
        navigate(redirect);
    } catch (err) {
       toast.error(err?.data?.message || err.error) 
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Right Section – Login Form */}
      <div className="flex max-w-7xl p-6 mx-auto">
        <div className="w-full max-w-md bg-white p-8 mx-auto rounded-lg shadow border">
          <h2 className="text-2xl font-semibold mb-2">Welcome</h2>
          <p className="text-gray-600 mb-6">Please sign in to your account</p>

          <form className="space-y-4" onSubmit={submitHandler}>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Enter email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Enter password"
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded" />
                Remember me
              </label>
              <a href="#" className="text-black font-medium">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-techmart-color text-white py-2 rounded-md hover:bg-techmart-dark transition"
            >
              Sign in
            </button>

            { isLoading && <Loader />}
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-gray-600">Don’t have an account?</span>{" "}
            <Link to={redirect ? `/register?redirect=${redirect}` : '/register'} className="font-medium text-black">
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
