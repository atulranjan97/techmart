// Core Modules
import { useState, useEffect } from "react";

// External Modules
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

// Custom Modules
import { useProfileMutation } from "../slices/usersApiSlice";
import { useGetMyOrdersQuery } from "../slices/ordersApiSlice";
import { setCredentials } from "../slices/authSlice";
import Message from "../components/Message";
import Loader from "../components/Loader";

const ProfilePage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();

  const {
    data: orders,
    isLoading: loadingOrders,
    error: errorOrders,
  } = useGetMyOrdersQuery();

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const res = await updateProfile({
        _id: userInfo._id,
        name,
        email,
        password,
      }).unwrap();

      dispatch(setCredentials(res));
      toast.success("Profile updated successfully");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    // <div className="max-w-7xl py-10 px-4 mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 border">
    <div className="max-w-7xl mx-auto px-2">
      <h2 className="max-w-4xl text-2xl font-bold my-3 mx-auto">My Orders</h2>

      {loadingOrders ? (
        <Loader className="mx-auto" />
      ) : errorOrders ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : orders?.length === 0 ? (
        <Message>No orders found.</Message>
      ) : (
        <>
          {/* ------------------------------------ MOBILE SCREEN SIZE ------------------------------------ */}
          <div className="md:hidden">
            {orders?.map((order) => (
              <div className="mb-2 bg-white rounded-md border border-slate-300">
                {order?.orderItems?.map((item) => (
                  <Link
                    key={item.product}
                    to={`/order/${order._id}`}
                    className="flex gap-3 p-2 border-b last:border-b-0 border-slate-300 items-center "
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-contain rounded"
                    />

                    <div className="flex-1 min-w-0">
                      <h2 className="text-techmart-darker text-sm font-semibold truncate">
                        {item.name}
                      </h2>

                      <p className="text-sm text-gray-500">
                        Ordered on {order.createdAt.substring(0, 10)}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            ))}
          </div>

          {/* ------------------------------------ DESKTOP SCREEN SIZE ------------------------------------ */}
          <div className="hidden md:flex md:flex-col md:gap-3 md:max-w-3xl lg:max-w-4xl mx-auto my-3">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white border border-slate-300 rounded-lg overflow-hidden"
              >
                {/* ORDER HEADER */}
                {/* <div className="hidden lg:flex flex-col lg:flex-row lg:justify-between gap-4 p-4 border-b-2 border-gray-300"> */}
                <div className="hidden md:flex flex-col md:flex-row md:justify-between gap-4 p-4 border-b-2 border-gray-300">
                  <div className="flex flex-wrap gap-6 text-sm">
                    <div>
                      <p className="text-gray-500">ORDER PLACED</p>
                      <p className="font-medium">
                        {order.createdAt.substring(0, 10)}
                      </p>
                    </div>

                    <div>
                      <p className="text-gray-500">TOTAL</p>
                      <p className="font-medium">
                        ₹{order.totalPrice.toLocaleString("en-IN")}
                      </p>
                    </div>

                    <div>
                      <p className="text-gray-500">SHIP TO</p>
                      <p className="font-medium">{userInfo?.name}</p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <p className="text-gray-500 text-sm">ORDER # {order._id}</p>
                    <div className="flex gap-4 items-center">
                      {order.isDelivered ? (
                        <span className="text-sm bg-green-100 text-green-700 px-3 rounded-full w-fit">
                          Delivered
                        </span>
                      ) : (
                        <span className="text-sm bg-red-100 text-red-700 px-3 py-1 rounded-full w-fit">
                          Not delivered
                        </span>
                      )}

                      <Link
                        to={`/order/${order._id}`}
                        className="text-sm text-techmart-dark font-medium hover:underline"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>

                {/* ORDER ITEMS */}
                {order.orderItems.map((item) => (
                  <div
                    key={item.product}
                    // className="hidden lg:flex flex-col sm:flex-row gap-5 p-6 border-b last:border-b-0 border-gray-300"
                    className="hidden md:flex flex-col sm:flex-row gap-5 p-6 border-b last:border-b-0 border-gray-300"
                  >
                    <Link
                      to={`/products/${item.product}`}
                      className="font-medium text-techmart-dark hover:underline"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-24 object-contain rounded-lg"
                      />
                    </Link>

                    <div className="flex-1">
                      <Link
                        to={`/products/${item.product}`}
                        className="font-medium text-techmart-dark hover:underline"
                      >
                        {item.name}
                      </Link>

                      <div className="flex flex-wrap gap-3 mt-4">
                        <Link
                          to={`/placeorder/${item.product}?qty=${1}`}
                          className="px-4 py-1.5 border rounded-lg text-sm hover:bg-gray-50 cursor-pointer"
                        >
                          Buy Again
                        </Link>

                        <HashLink to={`/products/${item.product}#review`} className="px-4 py-1.5 border rounded-lg text-sm hover:bg-gray-50">
                          Review
                        </HashLink>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
    // </div>
  );
};

export default ProfilePage;
