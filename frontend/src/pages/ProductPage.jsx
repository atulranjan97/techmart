// Core Modules
import { useState } from "react";
// External Modules
import { useParams, useNavigate } from "react-router-dom"; // we're gonna need to get the id from the url and we can get that with a hook called useParams and that's from react-router-dom
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
// Custom Modules
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useGetProductDetailsQuery } from "../slices/productsApiSlice";
import { addToCart } from "../slices/cartSlice";


const ProductPage = () => {
  const { id: productId } = useParams();
  // we destructure the id and rename it to productId

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);

  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsQuery(productId);

  const cartItems = useSelector((state) => state.cart.cartItems); 

  const addToCartHandler = async () => {
    const itemExist = cartItems.find((item) => item._id === product._id);

    const currQty = itemExist ? itemExist.qty : 0;
    const qtyToAdd = currQty + qty;

    if (qtyToAdd <= product.countInStock) {
      dispatch(addToCart({ ...product, qty: qtyToAdd}));
      navigate('/cart');
    } else {
      toast.error('You’ve reached the limit”', {
        position: 'top-center',
        autoClose: 1000,
        hideProgressBar: true,
      })
    }
  };

  return (
    <div className="max-w-7xl mx-auto lg:py-7 px-2 bg-white">
      {" "}
      {/* px-6 py-7 */}
      <Link
        to="/"
        className="mb-4 hidden lg:inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 border border-gray-400 rounded-lg bg-white hover:text-black transition"
      >
        Go Back
      </Link>
      

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error?.data?.message || error.error}</Message>
      ) : (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 mb-8 lg:py-4">

            {/* Left - Image */}
            <div className="flex items-center justify-center">
              <img
                src={product.image}
                alt="Product"
                className="object-contain h-96 border border-slate-300"
              />
            </div>

            {/* Right - Details */}
            <div className="">
              {/* Name */}
              <h1 className="text-2xl font-bold text-gray-900">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="">
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />
              </div>

              {/* Price */}
              <p className="text-xl font-semibold text-black mt-2">
                ₹{product.price.toLocaleString("en-IN")}
                {/* ₹{product.price?.toLocaleString("en-IN")} */}
              </p>
              {/* ₹{product.price.toLocaleString("en-IN")} */}
              {/* This will give error(Uncaught TypeError: Cannot read properties of undefined (reading 'toLocaleString')) because: React renders once before async data from useEffect arrives, so initial state values like {} cause properties such as product.price to be undefined, and calling methods on them crashes the app; using optional chaining (product.price?.toLocaleString("en-IN")) tells JavaScript to stop execution if the value is null or undefined, preventing the error during the first render, allowing React to render safely until the API response updates the state and triggers a re-render with valid data. */}

              {/* Description */}
              <p className="text-gray-500 font-semibold mt-4">
                {product.description}
              </p>

              {/* Status */}
              <div className="mt-6 text-gray-700 flex gap-x-3">
                <span className="font-semibold text-gray-700">Status:</span>
                <span className="font-bold text-gray-500">
                  {product.countInStock === 0 ? "Out of Stock" : "In Stock"}
                </span>
              </div>

              {/* Quantity */}
              {product.countInStock > 0 && (
                <div className="flex items-center gap-4 mt-6">
                  <span className="font-semibold text-gray-700">Quantity:</span>
                  <select className="w-20 border rounded-md px-3 py-1" name="" value={qty} onChange={(e) => setQty(Number(e.target.value))}>
                    {[...Array(product.countInStock).keys()].map((x) => <option key={x + 1} value={x + 1}> {x + 1} </option>)}
                  </select>
                </div>
              )}

              {/* Quantity
              <div className="flex items-center gap-4 mt-6">
                  <span className="font-medium">Quantity:</span>
                  <input
                  type="number"
                  min="1"
                  max={product.countInStock}
                  defaultValue="1"
                  className="w-20 border rounded-md px-3 py-1"
                  />
              </div> */}

              {/* Actions */}
              <div className="flex gap-4 mt-8">
                <button className="px-6 py-3 bg-techmart-dark text-white rounded-lg cursor-pointer hover:bg-techmart-darker" onClick={addToCartHandler}>
                  Add to Cart
                </button>
                <button
                  disabled={product.countInStock === 0}
                  className={`px-6 py-3 border rounded-lg hover:bg-gray-100 ${product.countInStock === 0 && "opacity-50 cursor-not-allowed"}`}
                >
                  Buy Now
                </button>
              </div>

              {/* Extra Info */}
              <div className="mt-8 text-sm text-gray-500 space-y-1">
                <p>✔ Free delivery</p>
                <p>✔ 1 year warranty</p>
                <p>✔ Easy returns</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductPage;
