// Core Module
import { useState, useEffect } from "react";
// External Module
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
// Custom Module
import { saveShippingAddress } from "../slices/cartSlice";
import CheckoutSteps from "../components/CheckoutSteps";

const ShippingPage = () => {
  const {cartItems, shippingAddress} = useSelector((state) => state.cart);

  const [address, setAddress] = useState(shippingAddress?.address || "");
  const [city, setCity] = useState(shippingAddress?.city || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress?.postalCode || "",
  );
  const [country, setCountry] = useState(shippingAddress?.country || "");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const qty = searchParams.get("qty");
  console.log(id, qty)

  useEffect(() => {
    // if (!cartItems.length) {
    //   navigate('/cart');
    // } 
    if (!id && !qty) {
      if (!cartItems.length) {
        navigate('/cart')
      }
    }
  }, [cartItems.length, navigate])

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));

    if (id && qty) {
      navigate(`/payment?id=${id}&qty=${qty}`);
    } else {
      navigate(`/payment`);
    }    

  };

  return (
    <div className="flex flex-col gap-y-4 max-w-7xl p-6 mx-auto">
      <div className="w-full mb-3 mx-auto">
        <CheckoutSteps step1 step2 />
      </div>
      {/* is as same as <CheckoutSteps step1={true} step2={true} /> */}

      <div className="w-full max-w-md bg-white p-8 mx-auto border border-slate-300">
        <h2 className="text-3xl lg:font-bold mb-2 text-techmart-color">
          Shipping
        </h2>

        <form className="space-y-4 my-6" onSubmit={submitHandler}>
          <div>
            <label htmlFor="address" className="block text-sm font-medium mb-1">
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={address}
              required
              onChange={(e) => setAddress(e.target.value)}
              className="w-full border border-gray-400 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Enter name"
            />
          </div>

          <div>
            <label htmlFor="city" className="block text-sm font-medium mb-1">
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={city}
              required
              onChange={(e) => setCity(e.target.value)}
              className="w-full border border-gray-400 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Enter email"
            />
          </div>

          <div>
            <label
              htmlFor="postalCode"
              className="block text-sm font-medium mb-1"
            >
              Postal Code
            </label>
            <input
              type="text"
              name="postalCode"
              id="postalCode"
              value={postalCode}
              required
              onChange={(e) => setPostalCode(e.target.value)}
              className="w-full border border-gray-400 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Enter password"
            />
          </div>

          <div>
            <label htmlFor="country" className="block text-sm font-medium mb-1">
              Country
            </label>
            <input
              type="text"
              name="country"
              id="country"
              value={country}
              required
              onChange={(e) => setCountry(e.target.value)}
              className="w-full border border-gray-400 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Enter password"
            />
          </div>

          <button
            type="submit"
            className="w-fit bg-techmart-color text-white p-2 rounded-md hover:bg-techmart-dark cursor-pointer mt-3"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default ShippingPage;
