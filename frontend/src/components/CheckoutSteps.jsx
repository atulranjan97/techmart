import { Link } from "react-router-dom";

const CheckoutSteps = ({ step1, step2, step3, step4, mode }) => {
  return (
    <nav aria-label="Checkout Steps" className="max-w-sm mx-auto">
      <ol className="flex justify-between text-center text-md">
        
        <li>
          {step1 ? (
            <Link to={`/login?mode=${mode}`} className="font-medium hover:text-blue-700">
              Sign In
            </Link>
          ) : (
            <span className="opacity-50 cursor-not-allowed">
              Sign In
            </span>
          )}
        </li>

        <li>
          {step2 ? (
            <Link to={`/shipping?mode=${mode}`} className="font-medium hover:text-blue-700">
              Shipping
            </Link>
          ) : (
            <span className="opacity-50 cursor-not-allowed">
              Shipping
            </span>
          )}
        </li>

        <li>
          {step3 ? (
            <Link to={`/payment?mode=${mode}`} className="font-medium hover:text-blue-700">
              Payment
            </Link>
          ) : (
            <span className="opacity-50 cursor-not-allowed">
              Payment
            </span>
          )}
        </li>

        <li>
          {step4 ? (
            <Link to={`/placeorder?mode=${mode}`} className="font-medium hover:text-blue-700">
              Place Order
            </Link>
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
