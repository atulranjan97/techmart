// External Modules
import { useParams } from "react-router-dom";
// Local Modules
import {
  useGetLatestProductQuery,
  useGetProductsQuery,
} from "../slices/productsApiSlice.js";
import { useGetTopProductsQuery } from "../slices/productsApiSlice.js";
import ProductCard from "../components/ProductCard.jsx";
import Loader from "../components/Loader.jsx";
import Message from "../components/Message.jsx";
import Paginate from "../components/Paginate.jsx";
import ProductCarousel from "../components/ProductCarousel.jsx";

const HomePage = () => {
  const { pageNumber, keyword } = useParams();
  // const { data, isLoading, error } = useGetProductsQuery({
  //   keyword,
  //   pageNumber,
  // });

  const {
    data: latestProducts,
    isLoading: loadingLatest,
    error: errorLatest,
  } = useGetLatestProductQuery();

  const {
    data: topProducts,
    isLoading: loadingTop,
    error: errorTop,
  } = useGetTopProductsQuery();

  return (
    <div className="max-w-7xl mx-auto mb-3 md:px-4 lg:py-3">
      {loadingLatest ? (
        <Loader className="mx-auto mt-8" />
      ) : errorLatest ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          {/* Carousel (top 3 products) */}
          {loadingTop ? (
            <Loader className="mx-auto" />
          ) : (
            <>
              <h1 className="font-bold text-xl md:text-3xl my-3 text-gray-500 text-center lg:text-left">
                Top Products
              </h1>
              <ProductCarousel products={topProducts} />
            </>
          )}

          {/* Latest Products (Six latest products) */}
          <h1 className="font-bold text-xl md:text-3xl my-6 text-gray-500 text-center lg:text-left">
            Latest Products
          </h1>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3 my-3 w-fit mx-auto">
            {latestProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default HomePage;
