// Core Modules
import { useState, useEffect } from "react";
// External Modules
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
// Custom Modules
import CheckoutSteps from "../components/CheckoutSteps";
import { savePaymentMethod } from "../slices/cartSlice";

const PaymentPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode");

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [paymentMethod, setPaymentMethod] = useState("Paypal");

  useEffect(() => {
    if (!Object.keys(shippingAddress).length) {
        navigate('/shipping');
    }
  }, [shippingAddress, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate(`/placeorder?mode=${mode}`);
  }

  return (
    <div className="flex flex-col gap-y-4 max-w-7xl p-6 mx-auto">
      <div className="w-full mb-3 mx-auto">
        <CheckoutSteps step1 step2 step3 />
      </div>
      {/* is as same as <CheckoutSteps step1={true} step2={true} /> */}

      <div className="w-full max-w-md bg-white p-8 mx-auto border border-slate-300">
        <h2 className="text-3xl lg:font-bold mb-2 text-techmart-color">
          Payment Method
        </h2>

        <form className="" onSubmit={submitHandler}>
          <h2 className="text-lg mt-4">Select Method</h2>

          <div className="mt-2 flex gap-2">
            <input
              type="radio"
              id="Payment_method"
              name="paymentMethod"
              value={'Paypal'}
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
              placeholder="Enter name"
            />
            <label htmlFor="payment_method">Paypal or Credit Card</label>
          </div>

          <button
            type="submit"
            className="w-fit bg-techmart-color text-white p-1 px-2 rounded-md hover:bg-techmart-dark cursor-pointer mt-3"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentPage;
