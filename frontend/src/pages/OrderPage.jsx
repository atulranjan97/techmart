// Core Modules
import { useEffect } from "react";
// External Modules
import { Link, useParams } from "react-router-dom";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
// Custom Modules
import {
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useGetPayPalClientIdQuery,
} from "../slices/ordersApiSlice";
import Message from "../components/Message";
import Loader from "../components/Loader";

const OrderPage = () => {
  const { id: orderId } = useParams();
  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);

  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
  // We already have an isLoading from `useGetOrderDetailsQuery`, so to avoid name clash we rename isLoading from `usePayOrderMutation` to loadingPay

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  // Get PayPal client ID from backend
  const {
    data: paypal,
    isLoading: loadingPayPal,
    error: errorPayPal,
  } = useGetPayPalClientIdQuery();

  const { userInfo } = useSelector((state) => state.auth);

  // we're gonna create a useEffect because we need to load the paypal script. In the first version of this course, we loaded the script by manually adding the script tags. So here we're using the package that we installed, the PayPal React package, which makes it a little bit cleaner
  // Load PayPal script dynamically
  useEffect(() => {
    //  Only continue if client ID is ready.
    if (!errorPayPal && !loadingPayPal && paypal.clientId) {
      const loadPayPalScript = async () => {
        paypalDispatch({
          type: "resetOptions", // Reloads PayPal script with new configuration.
          value: {
            "client-id": paypal.clientId, // load script using this client ID
            currency: "USD",
          },
        });
        paypalDispatch({ type: "setLoadingStatus", value: "pending" });
        // `setLoadingStatus` forces script to start loading. Without this the button never appears
      };

      // Only load PayPal if order is NOT paid, this prevents duplicate payments.
      if (order && !order.isPaid) {
        // if paypal script is not already loaded then go ahead and load it
        if (!window.paypal) {
          loadPayPalScript();
        }
      }
    }
  }, [order, paypal, paypalDispatch, loadingPayPal, errorPayPal]);

  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              currency_code: "USD",
              value: (Number(order.totalPrice) / 90.42).toFixed(2),
            },
          },
        ],
      })
      .then((orderId) => {
        return orderId;
      });
  }

  function onApprove(data, actions) {
    // actions comes from paypal
    return actions.order.capture().then(async function (details) {
      try {
        await payOrder({ orderId, details });
        refetch();
        toast.success("Payment successful");
      } catch (err) {
        toast.error(err?.data?.message || err.message);
      }
    });
  }

  async function onApproveTest() {
    await payOrder({ orderId, details: { payer: {} } });
    refetch();
    toast.success("Payment successful");
  }

  function onError(err) {
    toast.error(err.message);
  }

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger" />
  ) : (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white shadow rounded-lg p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="">
            <h1 className="text-xl lg:text-2xl text-techmart-color font-bold">
              Order #{order._id}
            </h1>
            <p className="text-gray-500 text-sm">
              {/* Placed on March 12, 2025 */}
              Placed on {order.createdAt}
            </p>
          </div>

          {/* Status badges */}
          <div className="flex gap-3">
            {order.isDelivered ? (
              <span className="px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-700">
                Delivered on {order.deliveredAt}
              </span>
            ) : (
              <span className="px-3 py-1 text-sm rounded-full bg-red-100 text-red-700">
                Not Delivered
              </span>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* LEFT */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Info */}
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl text-techmart-color font-bold border-b border-gray-300 pb-3">
                Shipping Information
              </h2>

              <div className="space-y-2 text-gray-700 mt-3">
                <p>
                  <span className="font-semibold text-techmart-color">
                    Name:
                  </span>{" "}
                  {order.user.name}
                </p>
                <p>
                  <span className="font-semibold text-techmart-color">
                    Email:
                  </span>{" "}
                  {order.user.email}
                </p>
                <p>
                  <span className="font-semibold text-techmart-color">
                    Address:{" "}
                  </span>
                  {order.shippingAddress.address}, {order.shippingAddress.city},{" "}
                  {order.shippingAddress.postalCode},{" "}
                  {order.shippingAddress.country}
                </p>
              </div>
            </div>

            {/* Payment Info */}
            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex items-center justify-between pb-3 border-b border-gray-300">
                <h2 className="text-xl text-techmart-color font-bold">
                  Payment Details
                </h2>

                {order.isPaid ? (
                  <span className="hidden lg:block px-3 py-1 text-sm rounded-full bg-green-100 text-green-700">
                    Paid on {order.paidAt}
                  </span>
                ) : (
                  <span className="hidden lg:block px-3 py-1 text-sm rounded-full bg-red-100 text-red-700">
                    Not Paid
                  </span>
                )}
              </div>

              <p className="text-gray-700 mt-2">
                <span className="font-semibold text-techmart-color">
                  Method:{" "}
                </span>{" "}
                {order.paymentMethod}
              </p>

              {/* Mobile Screen Size */}
              {order.isPaid ? (
                <span className="lg:hidden inline-block mt-2 px-3 py-1 text-sm rounded-lg bg-green-100 text-green-700">
                  Paid on {order.paidAt}
                </span>
              ) : (
                <span className="lg:hidden inline-block mt-2 px-3 py-1 text-sm rounded-full bg-red-100 text-red-700">
                  Not Paid
                </span>
              )}
            </div>

            {/* Items */}
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl text-techmart-color font-bold mb-4">
                Order Items
              </h2>
              {order.orderItems.map((item) => (
                <div
                  key={item._id}
                  className="divide-y border-t border-gray-300"
                >
                  {/* Item */}
                  <div className="flex items-center gap-4 py-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />

                    <div className="flex-1">
                      <Link to={`/products/${item.product}`}>
                        <p className="font-medium hover:underline">
                          {item.name}
                        </p>
                      </Link>
                      <p className="text-sm text-gray-500">Qty: {item.qty}</p>
                    </div>

                    <div className="min-w-25 text-right">
                      <p className="text-sm text-gray-500">
                        ₹{Number(item.price).toLocaleString("en-IN")} ×{" "}
                        {item.qty}
                      </p>

                      <p className="font-semibold text-lg text-gray-900">
                        ₹
                        {(Number(item.price) * item.qty).toLocaleString(
                          "en-IN",
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — SUMMARY */}
          <div className="bg-white shadow rounded-lg p-6 h-fit">
            <h2 className="text-xl text-techmart-color font-bold mb-4">
              Order Summary
            </h2>

            <div className="space-y-3 text-gray-700">
              <div className="flex justify-between">
                <span className="font-medium">Items</span>
                <span>₹{Number(order.itemsPrice).toLocaleString("en-IN")}</span>
              </div>

              <div className="flex justify-between">
                <span className="font-medium">Shipping</span>
                <span>
                  ₹{Number(order.shippingPrice).toLocaleString("en-IN")}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="font-medium">Tax</span>
                <span>₹{Number(order.taxPrice).toLocaleString("en-IN")}</span>
              </div>

              <div className="border-t border-gray-300 pt-3 flex justify-between font-semibold text-lg mb-4">
                <span className="font-medium">Total</span>
                <span>₹{Number(order.totalPrice).toLocaleString("en-IN")}</span>
              </div>
            </div>

            {/* PAY ORDER PLACEHOLDER */}
            {!order.isPaid && (
              <div className="">
                {loadingPay && <Loader />}
                {isPending ? (
                  <Loader />
                ) : (
                  <div className="flex flex-col gap-3">
                    {/* <button onClick={onApproveTest} className="bg-yellow-400 hover:bg-yellow-500 w-full py-2 italic font-black rounded-sm text-xl cursor-pointer">
                      <span className="text-blue-900">Test Pay </span>
                      <span className="text-sky-500">Order</span>
                    </button> */}
                    {/* `Test Pay Order` button set `isPaid` to true, so we don't have to go through paypal */}

                    <div className="">
                      <PayPalButtons
                        className=""
                        createOrder={createOrder}
                        onApprove={onApprove}
                        onError={onError}
                      ></PayPalButtons>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* MARK AS DELIVERED PLACEHOLDER */}

            {/* Optional CTA */}
            {order.isPaid && (
              <button className="mt-6 w-full py-3 rounded-xl bg-yellow-400 hover:bg-yellow-500 font-semibold transition cursor-pointer">
                Download Invoice
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;

/*  PayPal integration flow

      Get client ID → Load PayPal script → Show button → User pays → Backend verifies → DB updated
*/
