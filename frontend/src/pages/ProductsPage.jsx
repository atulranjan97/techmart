// External Modules
import { useParams } from "react-router-dom";
// Local Modules
import { useGetProductsQuery } from "../slices/productsApiSlice.js";
import { useGetTopProductsQuery } from "../slices/productsApiSlice.js";
import ProductCard from "../components/ProductCard.jsx";
import Loader from "../components/Loader.jsx";
import Message from "../components/Message.jsx";
import Paginate from "../components/Paginate.jsx";

const ProductsPage = () => {
  const { pageNumber, keyword } = useParams();
  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    pageNumber,
  });

  return (
    <div className="max-w-7xl mx-auto mb-3 md:px-4 lg:py-3">
      {isLoading ? (
        <Loader className="mx-auto mt-8" />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          {!keyword && (
            <>
            <h1 className="font-bold text-xl md:text-3xl my-3 text-gray-500 text-center lg:text-left">Products</h1>
            </>
          )}

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3 my-3 w-fit mx-auto">
            {data.products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>

          <Paginate
            pages={data.pages}
            page={data.page}
            keyword={keyword ? keyword : ""}
          />
        </>
      )}
    </div>
  );
};

export default ProductsPage;
