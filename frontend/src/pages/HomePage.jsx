import { useGetProductsQuery } from "../slices/productsApiSlice.js";
import ProductCard from "../components/ProductCard.jsx";
import Loader from "../components/Loader.jsx";
import Message from "../components/Message.jsx";

const HomePage = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();

  return (
    <div className="max-w-7xl mx-auto mb-3 md:px-4 lg:py-7">
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error?.data?.message || error.error}</Message>
      ) : (
        <>
          <h1 className="font-bold text-xl md:text-2xl my-1 text-gray-500 text-center lg:text-left">
            Latest Products
          </h1>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-3 w-fit mx-auto">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default HomePage;
