// Core
import { useEffect, useState } from "react";
// External
import {
  Link,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
// Custom
import { useCreateOrderMutation } from "../slices/ordersApiSlice";
import { clearCartItems } from "../slices/cartSlice";
import CheckoutSteps from "../components/CheckoutSteps";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { usePrepareBuyNowProductMutation } from "../slices/productsApiSlice";

const PlaceOrderPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [
    prepareBuyNow,
    { isLoading: loadingBuyNow, error: errorBuyNow, isError: isErrorBuyNow },
  ] = usePrepareBuyNowProductMutation();
  const [createOrder, { isLoading: loadingCreateOrder, error: errorCreateOrder }] = useCreateOrderMutation();


  const productId = searchParams.get("id");
  const qty = searchParams.get("qty");
  const isBuyNow = Boolean(productId);

  const [buyNowItem, setBuyNowItem] = useState({ product: [] });
  const cart = useSelector((state) => state.cart);

  const checkoutItems = isBuyNow ? buyNowItem.product : cart.cartItems;
  const checkoutPriceInfo = isBuyNow ? buyNowItem : cart;

  useEffect(() => {
    let redirectPath = null;

    if (isBuyNow) {
      if (!qty || qty <= 0 || isNaN(qty)) redirectPath = "/";
      else if (!cart.shippingAddress.address)
        redirectPath = `/shipping?id=${productId}&qty=${qty}`;
      else if (!cart.paymentMethod)
        redirectPath = `/payment?id=${productId}&qty=${qty}`;
    } else {
      if (!cart.cartItems.length) redirectPath = "/cart";
      else if (!cart.shippingAddress.address) redirectPath = "/shipping";
      else if (!cart.paymentMethod) redirectPath = "/payment";
    }

    if (redirectPath) {
      navigate(redirectPath);
      return;
    }

    if (isBuyNow) {
      prepareBuyNow({ productId, qty }).unwrap().then(setBuyNowItem);
    }
  }, [isBuyNow, qty, productId, cart, navigate]);

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

      if (!isBuyNow) {
        dispatch(clearCartItems());
      }
      navigate(`/order/${res._id}`);
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-2 lg:px-4 my-4">
      {/* Steps */}
      <div className="mb-4">
        <CheckoutSteps step1 step2 step3 step4 id={productId} qty={qty} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT SECTION */}
        <div
          className={`${isErrorBuyNow && "lg:col-span-3"} lg:col-span-2 space-y-2 lg:space-y-4`}
        >
          {/* Shipping */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between border-b border-gray-300 pb-3 mb-3">
              <h2 className="text-xl text-techmart-dark font-semibold">
                Shipping Address
              </h2>
              <Link
                to={
                  isBuyNow
                    ? `/shipping?id=${productId}&qty=${qty}`
                    : "/shipping"
                }
                className="text-xs font-semibold text-techmart-color hover:text-black hover:underline"
              >
                Change
              </Link>
            </div>

            <p className="text-slate-600 leading-relaxed">
              {cart.shippingAddress.address}, {cart.shippingAddress.city},{" "}
              {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
            </p>
          </div>

          {/* Payment */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl text-techmart-dark font-semibold border-b border-gray-300 pb-3 mb-3">
              Payment Method
            </h2>

            <span className="bg-slate-100 text-slate-700 px-4 py-1.5 rounded-full text-sm font-medium">
              {cart.paymentMethod}
            </span>
          </div>

          {/* Order Items */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl text-techmart-dark font-semibold border-b border-gray-300 pb-3 mb-3">
              Order Items
            </h2>

            {loadingBuyNow ? (
              <Loader />
            ) : errorBuyNow ? (
              <Message variant="danger">
                {errorBuyNow?.data?.message || errorBuyNow.error}
              </Message>
            ) : !isBuyNow && checkoutItems.length === 0 ? (
              <Message>Your Cart is empty</Message>
            ) : (
              <div className="divide-y divide-gray-300">
                {checkoutItems.map((item, index) => (
                  <div key={index} className="flex items-center gap-5 py-5">
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
                        {(Number(item.price) * item.qty).toLocaleString(
                          "en-IN",
                        )}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ORDER SUMMARY */}
        {errorBuyNow ? (
          <></>
        ) : (
          <div className="bg-white rounded-lg shadow p-6 h-fit sticky top-10">
            <h2 className="text-xl text-techmart-dark font-semibold mb-6 border-b border-gray-300 pb-3">
              Order Summary
            </h2>

            {loadingBuyNow ? (
              <Loader />
            ) : (
              <>
                <div className="space-y-4 text-slate-600">
                  <div className="flex justify-between">
                    <span>Items</span>
                    <span>
                      ₹{checkoutPriceInfo.itemsPrice?.toLocaleString("en-IN")}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>
                      ₹
                      {checkoutPriceInfo.shippingPrice?.toLocaleString("en-IN")}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>
                      ₹{checkoutPriceInfo.taxPrice?.toLocaleString("en-IN")}
                    </span>
                  </div>

                  <div className="border-t pt-4 flex justify-between font-semibold text-lg text-slate-900">
                    <span>Total</span>
                    <span>
                      ₹
                      {Number(checkoutPriceInfo.totalPrice)?.toLocaleString(
                        "en-IN",
                      )}
                    </span>
                  </div>
                </div>

                {errorCreateOrder && (
                  <div className="mt-4">
                    <Message variant="danger">{errorCreateOrder?.data?.message || errorCreateOrder.error}</Message>
                  </div>
                )}

                {loadingCreateOrder ? (<Loader />) 
                : (
                  <button
                    className={`mt-6 w-full bg-techmart-color text-white py-3 rounded-lg font-semibold hover:bg-techmart-dark transition ${cart.cartItems.length === 0 && !isBuyNow ? "disabled:opacity-50 disabled:cursor-not-allowed" : "cursor-pointer"}`}
                    onClick={placeOrderHandler}
                  >
                    Place Order
                  </button>
                )}
              </>
            )}

          </div>
        )}
      </div>
    </div>
  );
};

export default PlaceOrderPage;
