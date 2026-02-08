// Core Modules
import React from "react";
// External Modules
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
// Custom Modules
import Message from "../components/Message";
import { addToCart, clearBuyNowItem, removeFromCart } from "../slices/cartSlice";
import { toast } from "react-toastify";

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cartItems, shippingAddress, itemsPrice } = useSelector((state) => state.cart);
  const totalQty = cartItems.reduce((acc, item) => acc + item.qty, 0);

  const addToCartHandler = async (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = async (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    if (cartItems.length) {
      const { address, city, postalCode, country} = shippingAddress;
      dispatch(clearBuyNowItem());
      if (address && city && postalCode && country) {
        navigate("/placeorder");
      } else {
        navigate("/login?redirect=/shipping");
      }
    } else {
      toast.error('Your cart is empty. Add items to continue')
    }
  };

  return (
    <div className="max-w-7xl min-h-screen pb-25 lg:pb-0 mx-auto">
      {/* Header */}
      <div className="mx-auto px-4 py-3">
        <h1 className="text-xl lg:text-2xl font-bold text-techmart-color">
          Shopping Cart
        </h1>
      </div>

      <div className="px-1 grid lg:grid-cols-[1fr_320px] gap-4 lg:mx-5">
        {/* Cart Items */}
        <div className="space-y-3">
          {cartItems.length === 0 ? (
            <Message>Your cart is empty</Message>
          ) : (
            cartItems.map((item) => (
              <div key={item._id} className="bg-gray-50 p-2 flex gap-3">
                {/* Image */}
                <Link to={`/products/${item._id}`}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-contain"
                  />
                </Link>

                {/* Content */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <Link to={`/products/${item._id}`}>
                      <p className="text-sm line-clamp-2">{item.name}</p>
                    </Link>
                    <p className="font-semibold mt-1">₹ {item.price.toLocaleString("en-IN")}</p>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    {/* Qty */}
                    <select
                      className="border border-blue-500 rounded-md px-2 py-1 text-sm"
                      value={item.qty}
                      onChange={(e) =>
                        addToCartHandler(item, Number(e.target.value))
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>

                    {/* Delete */}
                    <button
                      className="text-gray-500 hover:text-techmart-dark"
                      onClick={() => {
                        removeFromCartHandler(item._id);
                      }}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Desktop Summary */}
        <div className="hidden lg:block bg-white p-4 shadow-sm h-fit">
          <h2 className="text-lg font-semibold mb-3">
            Subtotal ({totalQty}) items:
          </h2>

          <div className="flex justify-between text-sm mb-1">
            <span>Total Price</span>
            <span>₹ {Number(itemsPrice).toLocaleString("en-IN")}</span>
          </div>

          <div className="border-t my-3"></div>

          <button
            disabled={!cartItems.length}
            className={`w-full bg-techmart-dark text-white py-2 rounded-md ${(!cartItems.length) ? "disabled:opacity-50 disabled:cursor-not-allowed" : "cursor-pointer"}`}
            onClick={checkoutHandler}
          >
            Checkout
          </button>
        </div>
      </div>

      {/* Mobile Sticky Checkout */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-300 px-4 py-3 flex items-center justify-between">
        <div>
          <p className="text-xs text-gray-500">Total ({totalQty})</p>
          <p className="font-semibold">
            ₹ {Number(itemsPrice).toLocaleString("en-IN")}
          </p>
        </div>

        <button
          disabled={!cartItems.length}
          className="bg-techmart-dark text-white px-6 py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={checkoutHandler}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartPage;
