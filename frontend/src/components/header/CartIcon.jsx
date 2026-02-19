import { Link } from "react-router-dom";
import { GiShoppingCart } from "react-icons/gi";

const CartIcon = ({ cartItems = [] }) => {
  const totalQty = cartItems.reduce((acc, curr) => acc + curr.qty, 0);
  const displayCount = totalQty > 99 ? "99+" : totalQty;

  return (
    <Link to="/cart" className="inline-flex items-center gap-2 text-white">
      
      <div className="relative">
        <GiShoppingCart className="size-8 md:size-9" />

        {totalQty > 0 && (
          <span
            className="absolute -top-2 -right-2
                       min-w-5 h-5 px-1
                       flex items-center justify-center
                       text-xs font-medium
                       bg-teal-700 text-white
                       rounded-full border border-white"
          >
            {displayCount}
          </span>
        )}
      </div>

      <span className="text-sm hidden lg:inline font-semibold">Cart</span>
    </Link>
  );
};

export default CartIcon;
