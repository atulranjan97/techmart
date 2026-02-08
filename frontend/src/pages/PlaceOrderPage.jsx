// Core
import { useEffect } from "react";
// External
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
// Custom
import { useCreateOrderMutation } from "../slices/ordersApiSlice";
import { clearCartItems, clearBuyNowItem } from "../slices/cartSlice";
import CheckoutSteps from "../components/CheckoutSteps";
import Message from "../components/Message";
import Loader from "../components/Loader";

const PlaceOrderPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode");

  const cart = useSelector((state) => state.cart);

  const checkoutItems =
    mode === "buynow" ? cart.buyNowItem.item : cart.cartItems;

  const checkoutPriceInfo =
    mode === "buynow" ? cart.buyNowItem : cart;

  const [createOrder, { isLoading, error }] =
    useCreateOrderMutation();

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate("/shipping");
    } else if (!cart.paymentMethod) {
      navigate("/payment");
    }
  }, [cart.shippingAddress.address, cart.paymentMethod, navigate]);

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: checkoutItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: checkoutPriceInfo.itemsPrice,
        taxPrice: checkoutPriceInfo.taxPrice,
        shippingPrice: checkoutPriceInfo.shippingPrice,
        totalPrice: checkoutPriceInfo.totalPrice,
      }).unwrap();

      dispatch(clearCartItems());
      dispatch(clearBuyNowItem);
      navigate(`/order/${res._id}`);
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4">

        {/* Steps */}
        <div className="mb-8">
          <CheckoutSteps step1 step2 step3 step4 mode={mode} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* LEFT SECTION */}
          <div className="lg:col-span-2 space-y-6">

            {/* Shipping */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between pb-3">
                <h2 className="text-xl text-techmart-dark font-semibold">
                  Shipping Address
                </h2>
                <Link to={`/shipping?mode=${mode}`} className="text-xs font-semibold text-techmart-color hover:text-black hover:underline">Change</Link>
              </div>

              <p className="text-slate-600 leading-relaxed">
                {cart.shippingAddress.address},{" "}
                {cart.shippingAddress.city},{" "}
                {cart.shippingAddress.postalCode},{" "}
                {cart.shippingAddress.country}
              </p>
            </div>

            {/* Payment */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl text-techmart-dark font-semibold mb-3">
                Payment Method
              </h2>

              <span className="bg-slate-100 text-slate-700 px-4 py-1.5 rounded-full text-sm font-medium">
                {cart.paymentMethod}
              </span>
            </div>

            {/* Order Items */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl text-techmart-dark font-semibold border-b border-gray-300 pb-3 mb-5">
                Order Items
              </h2>

              {checkoutItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <div className="divide-y">
                  {checkoutItems.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-5 py-5"
                    >
                      {/* Image */}
                      <div className="bg-slate-100 rounded-xl p-2">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                      </div>

                      {/* Name */}
                      <div className="flex-1">
                        <Link
                          to={`/products/${item.product}`}
                          className="font-semibold text-slate-800 hover:underline"
                        >
                          {item.name}
                        </Link>

                        <p className="text-sm text-gray-500 mt-1">
                          Qty: {item.qty}
                        </p>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <p className="text-sm text-gray-500">
                          ₹{Number(item.price).toLocaleString("en-IN")} ×{" "}
                          {item.qty}
                        </p>

                        <p className="font-semibold text-lg">
                          ₹
                          {(
                            Number(item.price) * item.qty
                          ).toLocaleString("en-IN")}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT SUMMARY */}
          <div className="bg-white rounded-lg shadow p-6 h-fit sticky top-10">
            <h2 className="text-xl font-semibold mb-6">
              Order Summary
            </h2>

            <div className="space-y-4 text-slate-600">

              <div className="flex justify-between">
                <span>Items</span>
                <span>₹{checkoutPriceInfo.itemsPrice}</span>
              </div>

              <div className="flex justify-between">
                <span>Shipping</span>
                <span>₹{checkoutPriceInfo.shippingPrice}</span>
              </div>

              <div className="flex justify-between">
                <span>Tax</span>
                <span>₹{checkoutPriceInfo.taxPrice}</span>
              </div>

              <div className="border-t pt-4 flex justify-between font-semibold text-lg text-slate-900">
                <span>Total</span>
                <span>
                  ₹
                  {Number(
                    checkoutPriceInfo.totalPrice
                  ).toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            {error && (
              <div className="mt-4">
                <Message varient="danger">{error}</Message>
              </div>
            )}

            <button
              disabled={
                cart.cartItems.length === 0 &&
                mode !== "buynow"
              }
              className="mt-6 w-full bg-techmart-color text-white py-3 rounded-xl font-semibold hover:bg-techmart-dark transition disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={placeOrderHandler}
            >
              Place Order
            </button>

            {isLoading && <Loader />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrderPage;
