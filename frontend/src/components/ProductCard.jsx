import { Link } from "react-router-dom";
import Rating from "./Rating";

const ProductCard = ({product}) => {

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

                    <button className="px-2 py-1 md:px-4 md:py-2 bg-teal-700 text-white text-sm md:rounded-sm hover:bg-teal-900 transition">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
