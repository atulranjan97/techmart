import { Link } from "react-router-dom";

const CheckoutSteps = ({ step1, step2, step3, step4, id, qty }) => {
  console.log(id, qty)
  return (
    <nav aria-label="Checkout Steps" className="max-w-sm mx-auto">
      <ol className="flex justify-between text-center text-sm lg:text-md">
        
        <li>
          {step1 ? (
            <Link to={id ? `/login?id=${id}&qty=${qty}` : `/login`} className="font-medium hover:text-blue-700">
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
            <Link to={id ? `/shipping?id=${id}&qty=${qty}` : `/shipping`} className="font-medium hover:text-blue-700">
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
            <Link to={id ? `/payment?id=${id}&qty=${qty}` : `/payment`} className="font-medium hover:text-blue-700">
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
            <Link to={id ? `/placeorder?id=${id}&qty=${qty}` : `/placeorder`} className="font-medium hover:text-blue-700">
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
