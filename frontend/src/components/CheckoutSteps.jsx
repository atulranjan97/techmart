import { Link } from "react-router-dom";

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <nav aria-label="Checkout Steps" className="w-full max-w-md mx-auto">
      <ol className="flex justify-between text-center">
        
        <li>
          {step1 ? (
            <Link to="/login" className="font-medium">
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
            <Link to="/shipping" className="font-medium">
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
            <Link to="/payment" className="font-medium">
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
            <Link to="/placeorder" className="font-medium">
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
