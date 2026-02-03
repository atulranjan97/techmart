// Core
import { useEffect } from 'react';

// External
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

// Custom
import { useCreateOrderMutation } from '../slices/ordersApiSlice';
import { clearCartItems } from '../slices/cartSlice';
import CheckoutSteps from '../components/CheckoutSteps';
import Message from '../components/Message';
import Loader from '../components/Loader';


const PlaceOrderPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);

  const [createOrder, {isLoading, error}] = useCreateOrderMutation();

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate('/shipping');
    } else if (!cart.paymentMethod) {
      navigate('/payment');
    }
  }, [
    cart.shippingAddress.address,
    cart.paymentMethod,
    navigate,
  ]);

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        taxPrice: cart.taxPrice,
        shippingPrice: cart.shippingPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();
      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (error) {
      toast.error(error);
    }
  }

  return (
<div className="min-h-screen bg-slate-100 py-10">
  <CheckoutSteps step1 step2 step3 step4 />

  <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-8 mt-5">
    {/* LEFT */}
    <div className="lg:col-span-2 space-y-6">
      {/* Shipping */}
      <div className="bg-white rounded-lg border p-6">
        <h2 className="text-lg font-semibold text-techmart-color mb-3">
          Shipping Address
        </h2>

        <p className="text-slate-600 leading-relaxed">
          {cart.shippingAddress.address}, {cart.shippingAddress.city},{' '}
          {cart.shippingAddress.postalCode},{' '}
          {cart.shippingAddress.country}
        </p>
      </div>

      {/* Payment */}
      <div className="bg-white rounded-lg border p-6">
        <h2 className="text-lg font-semibold text-techmart-color mb-3">
          Payment Method
        </h2>

        <span className="inline-block bg-slate-100 px-3 py-1 rounded-full text-sm font-medium text-slate-700">
          {cart.paymentMethod}
        </span>
      </div>

      {/* Items */}
      <div className="bg-white rounded-lg border p-6">
        <h2 className="text-lg font-semibold text-techmart-color mb-4">
          Order Items
        </h2>

        {cart.cartItems.length === 0 ? (
          <Message>Your cart is empty</Message>
        ) : (
          <div className="divide-y">
            {cart.cartItems.map((item, index) => (
              <div
                key={index}
                className="py-4 flex items-center gap-4"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded"
                />

                <div className="flex-1">
                  <Link
                    to={`/products/${item.product}`}
                    className="font-medium text-slate-800 hover:underline"
                  >
                    {item.name}
                  </Link>
                </div>

                <div className="text-sm text-slate-600">
                  {item.qty} × ₹{Number(item.price).toLocaleString("en-IN")}
                </div>

                <div className="font-semibold text-slate-800">
                  ₹{Number(item.qty * item.price).toLocaleString("en-IN")}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>

    {/* RIGHT */}
    <div className="bg-white rounded-lg border p-6 h-fit sticky top-10">
      <h2 className="text-lg font-semibold text-techmart-color mb-4">
        Order Summary
      </h2>

      <div className="space-y-3 text-slate-600 text-sm">
        <div className="flex justify-between">
          <span>Items</span>
          <span>₹{cart.itemsPrice}</span>
        </div>

        <div className="flex justify-between">
          <span>Shipping</span>
          <span>₹{cart.shippingPrice}</span>
        </div>

        <div className="flex justify-between">
          <span>Tax</span>
          <span>₹{cart.taxPrice}</span>
        </div>

        <div className="border-t pt-4 flex justify-between font-semibold text-base text-slate-800">
          <span>Total</span>
          <span>₹{Number(cart.totalPrice).toLocaleString("en-IN")}</span>
        </div>
      </div>

      <div className="boder mt-4">
        { error && <Message varient='danger'>{error}</Message>}
      </div>

      <button disabled={cart.cartItems.length === 0} className="mt-6 w-full bg-techmart-color text-white py-3 rounded-xl hover:bg-techmart-dark transition disabled:opacity-50 disabled:cursor-not-allowed" onClick={placeOrderHandler}>
        Place Order
      </button>

      {isLoading && <Loader />}

    </div>
  </div>
</div>

  );
};

export default PlaceOrderPage;
