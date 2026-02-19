// Core Modules
import { useState } from "react";

// External Modules
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

// Custom Modules
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
} from "../slices/productsApiSlice";
import { addToCart } from "../slices/cartSlice";
import CustomSelect from "../components/CustomSelect";

const ProductPage = () => {
  const { id: productId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);
  console.log(product);

  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();

  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const addToCartHandler = async () => {
    const itemExist = cartItems.find((item) => item._id === product._id);
    const currQty = itemExist ? itemExist.qty : 0;
    const qtyToAdd = currQty + qty;

    if (qtyToAdd <= product.countInStock) {
      dispatch(addToCart({ ...product, qty: qtyToAdd }));
      navigate("/cart");
    } else {
      toast.error("You’ve reached the limit", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
      });
    }
  };

  const checkoutHandler = async () => {
    navigate(`/placeorder?id=${product._id}&qty=${qty}`);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await createReview({ productId, rating, comment }).unwrap();
      refetch();
      toast.success("Review submitted");
      setRating(0);
      setComment("");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      {/* Meta tags implementation (a react v19 feature, no need to use third party package like react-helmet-async) */}
      <title>{product?.name ? `${product.name} | TechMart` : "TechMart"}</title>
      <meta name="description" content={product?.description} />
      <meta property="og:title" content={product?.name} />
      <meta property="og:image" content={product?.image} />
      <meta property="og:description" content={product?.description} />

      {/* <div className="min-h-screen bg-linear-to-b from-gray-50 to-white"> */}
      <div className="min-h-screen">
        {/* Navigation Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors group border p-2 rounded-sm bg-gray-100"
          >
            Back to Shopping
          </Link>
        </div>

        {isLoading ? (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <Loader />
          </div>
        ) : error ? (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <Message variant="danger">
              {error?.data?.message || error.error}
            </Message>
          </div>
        ) : (
          <>
            {/* Hero Product Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 p-6 lg:p-10">
                  {/* Image Gallery Style */}
                  <div className="space-y-4">
                    <div className="aspect-w-1 aspect-h-1 bg-gray-100 rounded-xl overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-contain p-8 hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="flex flex-col space-y-6">
                    {/* Title & Rating */}
                    <div>
                      <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
                        {product.name}
                      </h1>
                      <div className="flex items-center gap-4">
                        <Rating
                          value={product.rating}
                          text={`${product.numReviews} reviews`}
                        />
                        <span className="text-sm text-gray-500">|</span>
                        <span
                          className={`text-sm font-medium ${product.countInStock ? "text-green-600" : "text-red-600"}`}
                        >
                          {product.countInStock > 0
                            ? "In Stock"
                            : "Out of Stock"}
                        </span>
                      </div>
                    </div>

                    {/* Price Card */}
                    <div className="bg-linear-to-r from-techmart-color/10 to-transparent p-6 rounded-xl">
                      <span className="text-sm text-gray-600">
                        Special Price
                      </span>
                      <div className="flex items-baseline gap-3 mt-1">
                        <span className="text-4xl font-bold text-gray-900">
                          ₹{product.price?.toLocaleString("en-IN")}
                        </span>
                        {/* Discount Placeholder */}
                        {/* <span className="text-lg text-gray-500 line-through">
                        ₹{(product.price * 1.2)?.toLocaleString("en-IN")}
                      </span> */}
                        {/* <span className="px-2 py-1 bg-green-100 text-green-700 text-sm font-semibold rounded">
                        20% OFF
                      </span> */}
                      </div>
                      <p className="text-sm text-gray-600 mt-2">
                        inclusive of all taxes
                      </p>
                    </div>

                    {/* Description */}
                    <div className="prose prose-sm max-w-none">
                      <h3 className="text-lg font-semibold text-gray-900">
                        Description
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {product.description}
                      </p>
                    </div>

                    {/* Key Features */}
                    <div className="grid grid-cols-2 gap-4 py-4">
                      {[
                        "Free Shipping",
                        "1 Year Warranty",
                        "Easy Returns",
                        "Secure Payment",
                      ].map((feature) => (
                        <div
                          key={feature}
                          className="flex items-center gap-2 text-sm text-gray-600"
                        >
                          <svg
                            className="w-5 h-5 text-green-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          {feature}
                        </div>
                      ))}
                    </div>

                    {/* Action Section */}
                    <div className="bg-gray-50 p-6 rounded-xl space-y-4">
                      {product.countInStock > 0 && (
                        <div className="flex items-center gap-4">
                          <span className="font-medium text-gray-700">
                            Quantity:
                          </span>
                          <div className="w-32">
                            <CustomSelect
                              options={[
                                ...Array(product.countInStock + 1).keys(),
                              ]
                                .slice(1)
                                .map((x) => ({
                                  value: x,
                                  label: `${x}`,
                                }))}
                              value={qty}
                              onChange={setQty}
                              visibleOptions={3}
                            />
                          </div>
                          <span className="text-sm text-gray-500">
                            {product.countInStock} units available
                          </span>
                        </div>
                      )}

                      <div className="flex flex-col sm:flex-row gap-3">
                        <button
                          onClick={addToCartHandler}
                          className="flex-1 px-6 py-3 bg-techmart-color text-white rounded-lg hover:bg-techmart-dark transition-all transform hover:scale-105 font-medium flex items-center justify-center gap-2"
                        >
                          Add to Cart
                        </button>

                        <button
                          disabled={product.countInStock === 0}
                          onClick={checkoutHandler}
                          className={`flex-1 px-6 py-3 border-2 border-techmart-color text-techmart-color rounded-lg hover:bg-techmart-color hover:text-white transition-all font-medium flex items-center justify-center gap-2 ${
                            product.countInStock === 0
                              ? "opacity-50 cursor-not-allowed hover:bg-transparent hover:text-techmart-color"
                              : ""
                          }`}
                        >
                          Buy Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Reviews Section - Redesigned */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Reviews List - Left Side (2 columns) */}
                <div className="lg:col-span-2 space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-900">
                      Customer Reviews
                    </h2>
                    <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full">
                      <span className="text-yellow-400">★</span>
                      <span className="font-semibold">{product.rating}</span>
                      <span className="text-gray-500">
                        ({product.numReviews})
                      </span>
                    </div>
                  </div>

                  {product.reviews.length === 0 && (
                    <Message>
                      No reviews yet. Be the first to share your experience.
                    </Message>
                  )}

                  {loadingProductReview && <Loader />}

                  <div className="space-y-4">
                    {product.reviews.map((review) => (
                      <div
                        key={review._id}
                        className="bg-white border border-gray-200 rounded-xl p-6 transition-shadow"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-linear-to-br from-techmart-color to-techmart-dark flex items-center justify-center text-white font-semibold text-lg">
                              {review.name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900">
                                {review.name}
                              </h3>
                              <p className="text-xs text-gray-400">
                                {new Date(review.createdAt).toLocaleDateString(
                                  "en-US",
                                  {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  },
                                )}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded">
                            <Rating value={review.rating} />
                          </div>
                        </div>

                        <p className="text-gray-600 leading-relaxed pl-15">
                          {review.comment}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Review Form - Right Side (1 column) */}
                <div className="lg:col-span-1">
                  <div className="bg-white border border-gray-200 rounded-xl p-6 sticky top-24">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-full bg-techmart-color/10 flex items-center justify-center">
                        <svg
                          className="w-5 h-5 text-techmart-color"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                      </div>
                      <h2 className="text-xl font-bold text-gray-900">
                        Write a Review
                      </h2>
                    </div>

                    {userInfo ? (
                      <form onSubmit={submitHandler} className="space-y-5">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Your Rating
                          </label>
                          <div className="relative">
                            <select
                              className="w-full appearance-none border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-techmart-color focus:border-transparent bg-white"
                              value={rating}
                              onChange={(e) => setRating(e.target.value)}
                            >
                              <option value="">Select rating</option>
                              <option value="1">⭐ 1 - Poor</option>
                              <option value="2">⭐⭐ 2 - Fair</option>
                              <option value="3">⭐⭐⭐ 3 - Good</option>
                              <option value="4">⭐⭐⭐⭐ 4 - Very Good</option>
                              <option value="5">
                                ⭐⭐⭐⭐⭐ 5 - Excellent
                              </option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 9l-7 7-7-7"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Your Review
                          </label>
                          <textarea
                            rows={5}
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Share your experience with this product..."
                            className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-techmart-color focus:border-transparent resize-none"
                          />
                        </div>

                        <button
                          type="submit"
                          className="w-full bg-linear-to-r from-techmart-color to-techmart-dark text-white py-3 rounded-lg hover:shadow-lg transition-all transform hover:scale-105 font-medium"
                        >
                          Submit Review
                        </button>
                      </form>
                    ) : (
                      <div className="text-center py-8">
                        <div className="w-20 h-20 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                          <svg
                            className="w-10 h-10 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                            />
                          </svg>
                        </div>
                        <p className="text-gray-600 mb-4">
                          Please sign in to write a review
                        </p>
                        <Link
                          to="/login"
                          className="inline-block px-6 py-2 bg-techmart-color text-white rounded-lg hover:bg-techmart-dark transition"
                        >
                          Sign In
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ProductPage;
