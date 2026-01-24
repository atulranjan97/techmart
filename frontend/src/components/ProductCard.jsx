import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../slices/cartSlice";
import Rating from "./Rating";

const ProductCard = ({product}) => {
    const dispatch = useDispatch();

    const { cartItems } = useSelector((state) => state.cart);   // delete

    const addToCartHandler = async () => {        // delete
        if (product.countInStock > 0) {
            const itemExist = cartItems.find((item) => item._id === product._id);
            const currQty = itemExist ? itemExist.qty : 0;
            dispatch(addToCart({ ...product, qty: currQty + 1 }));
            
        } 
    }

    return (
        <div className="max-w-xs md:rounded-md overflow-hidden md:shadow-md transition-shadow duration-300 bg-white border border-gray-300">
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

                    <button disabled={product.countInStock === 0} className="px-2 py-1 md:px-4 md:py-2 bg-techmart-color hover:bg-techmart-dark text-white text-sm md:rounded-sm transition" onClick={addToCartHandler}>
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
