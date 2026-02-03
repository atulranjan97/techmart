import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../slices/cartSlice";
import Rating from "./Rating";
import { toast } from "react-toastify";

const ProductCard = ({product}) => {
    const dispatch = useDispatch();

    // Subscribe to `cartItems` of cart state
    const cartItems = useSelector((state) => state.cart.cartItems);   

    const addToCartHandler = async () => {
        const itemExist = cartItems.find((item) => item._id === product._id);
        const currQty = itemExist ? itemExist.qty : 0;
        if (currQty < product.countInStock) {
            dispatch(addToCart({ ...product, qty: currQty + 1 }));
            toast.success('Item added to cart', {
                position: 'top-center',
                autoClose: 1000,
                hideProgressBar: true,
            });
        } else {
            toast.error('You’ve reached the limit', {
                position: 'top-center',
                autoClose: 1000,
                hideProgressBar: true,
            });
        }
    }

    return (
        <div className="max-w-xs overflow-hidden transition-shadow duration-300 bg-gray-100 border border-slate-300">
            {/* Product Image */}
            <Link to={`/products/${product._id}`}>
            <img
                src={product.image}
                alt="Product"
                className="w-full object-cover"
            />
            </Link>

            {/* Content */}
            <div className="p-2 md:p-4">
                <Link to={`/products/${product._id}`}>
                    <h3 className="text-sm md:text-lg font-semibold text-gray-800 hover:underline truncate">
                        {product.name}
                    </h3>
                </Link>
                
                {/* Rating */}
                <div className="">
                    <Rating value={ product.rating } text={`${product.numReviews} reviews`} />
                </div>

                {/* Price + Button */}
                <div className="flex items-center justify-between mt-4 text-sm md:text-xl">
                    <span className="font-bold text-gray-500">
                        ₹{product.price.toLocaleString("en-IN")}
                    </span>

                    <button disabled={product.countInStock === 0} className={`px-2 py-1 md:px-4 md:py-2 bg-techmart-color hover:bg-techmart-dark text-white text-sm md:rounded-sm transition cursor-pointer ${product.countInStock === 0 && "disabled:opacity-50 disabled:cursor-not-allowed"}`} onClick={addToCartHandler}>
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
