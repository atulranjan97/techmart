import { Link, NavLink } from "react-router-dom";

// const CheckoutSteps = ({ step1, step2, step3, step4, id, qty }) => {
const CheckoutSteps = ({ step1, step2, step3, step4, redirect}) => {
  return (
    <nav aria-label="Checkout Steps" className="max-w-sm mx-auto">
      <ol className="flex justify-between text-center text-sm lg:text-md">
        
        <li>
          {step1 ? (
            // <NavLink to={id ? `/login?id=${id}&qty=${qty}` : `/login`} className={({isActive}) => `font-medium hover:text-blue-700 ${isActive ? `bg-gray-300 px-2 py-1 rounded-md` : ''}`}>
            <NavLink to={redirect ? `/login?redirect=${encodeURIComponent(redirect)}` : `/login`} className={({isActive}) => `font-medium hover:text-blue-700 ${isActive ? `bg-gray-300 px-2 py-1 rounded-md` : ''}`}>
              Sign In
            </NavLink>
          ) : (
            <span className="opacity-50 cursor-not-allowed">
              Sign In
            </span>
          )}
        </li>

        <li>
          {step2 ? (
            // <NavLink to={id ? `/shipping?id=${id}&qty=${qty}` : `/shipping`} className={({isActive}) => `font-medium hover:text-blue-700 ${isActive ? `bg-gray-300 px-2 py-1 rounded-md` : ''}`}>
            <NavLink to={redirect ? `/shipping?redirect=${encodeURIComponent(redirect)}` : `/shipping`} className={({isActive}) => `font-medium hover:text-blue-700 ${isActive ? `bg-gray-300 px-2 py-1 rounded-md` : ''}`}>
              Shipping
            </NavLink>
          ) : (
            <span className="opacity-50 cursor-not-allowed">
              Shipping
            </span>
          )}
        </li>

        <li>
          {step3 ? (
            // <NavLink to={id ? `/payment?id=${id}&qty=${qty}` : `/payment`} className={({isActive}) => `font-medium hover:text-blue-700 ${isActive ? `bg-gray-300 px-2 py-1 rounded-md` : ''}`}>
            <NavLink to={redirect ? `/payment?redirect=${encodeURIComponent(redirect)}` : `/payment`} className={({isActive}) => `font-medium hover:text-blue-700 ${isActive ? `bg-gray-300 px-2 py-1 rounded-md` : ''}`}>
              Payment
            </NavLink>
          ) : (
            <span className="opacity-50 cursor-not-allowed">
              Payment
            </span>
          )}
        </li>

        <li>
          {step4 ? (
            // <NavLink to={id ? `/placeorder?id=${id}&qty=${qty}` : `/placeorder`} className={({isActive}) => `font-medium hover:text-blue-700 ${isActive ? `bg-gray-300 px-2 py-1 rounded-md` : ''}`}>
            <NavLink to={redirect ? `/placeorder?redirect=${encodeURIComponent(redirect)}` : `/placeorder`} className={({isActive}) => `font-medium hover:text-blue-700 ${isActive ? `bg-gray-300 px-2 py-1 rounded-md` : ''}`}>
              Place Order
            </NavLink>
          ) : (
            <span className="opacity-50 cursor-not-allowed">
              Place Order
            </span>
          )}
        </li>

      </ol>
    </nav>
  );
};

export default CheckoutSteps;
