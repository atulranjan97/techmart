import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FaTrash } from 'react-icons/fa'
import Message from '../components/Message'
import { addToCart, removeFromCart } from '../slices/cartSlice'
import { useNavigate } from 'react-router-dom'

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cartItems, itemsPrice } = useSelector((state) => state.cart)
  const totalQty = cartItems.reduce((acc, item) => acc + item.qty, 0)

  const addToCartHandler = async (product, qty) => {
    dispatch(addToCart({...product, qty}));
  }

  const removeFromCartHandler = async (id) => {
    dispatch(removeFromCart(id));
  }

  const checkoutHandler = () => {
    navigate('/login?redirect=/shipping');
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-24 md:pb-0">
      
      {/* Header */}
      <div className="bg-white px-4 py-3 shadow-sm sticky top-0 z-10">
        <h1 className="text-xl font-semibold text-techmart-color">
          Shopping Cart
        </h1>
      </div>

      <div className="max-w-7xl mx-auto px-3 grid md:grid-cols-[1fr_320px] gap-4 mt-4">
        
        {/* Cart Items */}
        <div className="space-y-3">
          {cartItems.length === 0 ? (
            <Message>Your cart is empty</Message>
          ) : (
            cartItems.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-lg p-3 flex gap-3 shadow-sm"
              >
                {/* Image */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-contain"
                />

                {/* Content */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-sm line-clamp-2">{item.name}</p>
                    <p className="font-semibold mt-1">₹ {item.price}</p>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    {/* Qty */}
                    <select
                      className="border rounded-md px-2 py-1 text-sm"
                      value={item.qty}
                      onChange={(e) => addToCartHandler(item, Number(e.target.value))}
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>

                    {/* Delete */}
                    <button className="text-gray-500 hover:text-techmart-dark" onClick={() => {removeFromCartHandler(item._id)}}>
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Desktop Summary */}
        <div className="hidden md:block bg-white rounded-lg p-4 shadow-sm h-fit">
          <h2 className="text-lg font-semibold mb-3">Subtotal ({totalQty}) items:</h2>

          <div className="flex justify-between text-sm mb-1">
            <span>Total Price</span>
            <span>₹ {itemsPrice.toLocaleString('en-IN')}</span>
          </div>

          <div className="border-t my-3"></div>

          <button className="w-full bg-techmart-dark text-white py-2 rounded-md" onClick={checkoutHandler}>
            Checkout
          </button>
        </div>
      </div>

      {/* Mobile Sticky Checkout */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t px-4 py-3 flex items-center justify-between">
        <div>
          <p className="text-xs text-gray-500">Total ({totalQty})</p>
          <p className="font-semibold">
            ₹ {itemsPrice.toLocaleString('en-IN')}
          </p>
        </div>

        <button className="bg-techmart-dark text-white px-6 py-2 rounded-md" onClick={checkoutHandler}>
          Checkout
        </button>
      </div>
    </div>
  )
}

export default CartPage
