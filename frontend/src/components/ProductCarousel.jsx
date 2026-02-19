import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const ProductCarousel = ({
  products = [],
  autoPlay = true,
  interval = 4000,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef(null);

  const resetTimeout = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  useEffect(() => {
    if (!autoPlay || products.length <= 1) return;

    resetTimeout();
    timeoutRef.current = setTimeout(() => {
      setCurrentIndex((prev) =>
        prev === products.length - 1 ? 0 : prev + 1
      );
    }, interval);

    return () => resetTimeout();
  }, [currentIndex, autoPlay, interval, products.length]);

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? products.length - 1 : prev - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev === products.length - 1 ? 0 : prev + 1
    );
  };

  if (!products.length) return null;

  return (
    <div className="relative w-full max-w-7xl mx-auto mt-4 px-4 lg:px-0">
      <div className="relative overflow-hidden bg-white">
        
        {/* Slides Wrapper */}
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {products.map((product) => (
            <div key={product._id} className="w-full shrink-0">
              
              {/* Split Layout */}
              <div className="flex flex-col md:flex-row md:h-90">
                
                {/* Left Side - Image */}
                <div className="md:w-1/2 w-full h-40 sm:h-48 md:h-full flex items-center justify-center bg-white overflow-hidden p-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>

                {/* Right Side - Content */}
                <div className="md:w-1/2 w-full flex flex-col justify-center p-5 md:p-10 bg-techmart-dark text-white">
                  <h2 className="text-lg sm:text-xl md:text-3xl font-bold mb-2 md:mb-4">
                    {product.name}
                  </h2>

                  <p className="text-base md:text-lg text-gray-300 mb-4 md:mb-6">
                    ₹{product.price.toLocaleString("en-IN")}
                  </p>

                  <Link
                    to={`/products/${product._id}`}
                    className="w-fit bg-white text-black px-4 py-2 md:px-6 md:py-3 rounded-full text-sm md:text-base hover:bg-gray-200 transition"
                  >
                    View Product
                  </Link>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-3 -translate-y-1/2 bg-black/60 text-white w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center hover:bg-black transition cursor-pointer"
        >
          ‹
        </button>

        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-3 -translate-y-1/2 bg-black/60 text-white w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center hover:bg-black transition cursor-pointer"
        >
          ›
        </button>

        {/* Pagination Dots */}
        <div className="absolute bottom-2 md:bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {products.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 md:w-3 md:h-3 rounded-full ${
                currentIndex === index ? "bg-black" : "bg-gray-300"
              }`}
            />
          ))}
        </div>

      </div>
    </div>
  );
};

export default ProductCarousel;
