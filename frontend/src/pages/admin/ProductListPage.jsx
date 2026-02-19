import React from "react";
// External Modules
import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
// Custom Modules
import {
  useGetProductsQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
} from "../../slices/productsApiSlice";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { useState } from "react";
import Paginate from "../../components/Paginate";

const ProductListPage = () => {
  const { pageNumber } = useParams();
  const { data, isLoading, error, refetch } = useGetProductsQuery({
    pageNumber,
  });

  const [createProduct, { isLoading: loadingCreate, error: errorCreate }] =
    useCreateProductMutation();
  const [deleteProduct, { isLoading: loadingDelete, error: errorDelete }] =
    useDeleteProductMutation();

  // product to delete id
  const [activeProductId, setActiveProductId] = useState(null);

  const createProductHandler = async () => {
    if (window.confirm("Are you sure you want to create a new product?")) {
      try {
        await createProduct().unwrap();
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        setActiveProductId(id);
        await deleteProduct(id).unwrap(); // .unwrap() is necessary because without it the mutation returns a resolved promise. `Success value` or `Error` lives inside result object
        toast.success("Product deleted");
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      } finally {
        setActiveProductId(null);
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto lg:p-6 flex flex-col gap-6">
      <div className="flex justify-between items-center">
        {/* <h2 className="text-2xl font-bold">Products</h2> */}
        {isLoading ? (
          <></>
        ) : loadingCreate ? (
          <Loader />
        ) : (
          <button
            className="flex items-center gap-2 px-2 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 whitespace-nowrap cursor-pointer"
            onClick={createProductHandler}
          >
            <FaEdit />
            Create Product
          </button>
        )}
      </div>

      {isLoading ? (
        <Loader className="mx-auto" />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <div className="bg-white lg:shadow-md rounded-xl overflow-hidden lg:text-sm">
          {/* DESKTOP */}
          <div className="hidden lg:flex flex-col">
            {/* HEADER */}
            <div className="hidden lg:grid grid-cols-[minmax(0,2.2fr)_minmax(0,3fr)_minmax(0,1fr)_minmax(0,1.3fr)_minmax(0,1.3fr)_180px] gap-4 bg-gray-100 p-3 font-semibold text-gray-700 border-b border-gray-300">
              <span className="truncate">ID</span>
              <span className="truncate">Name</span>
              <span>Price</span>
              <span className="truncate">Category</span>
              <span className="truncate">Brand</span>
              <span className="text-center">Actions</span>
            </div>
            {/* TABLE ROW */}
            {data.products.map((product) => (
              <div
                key={product._id}
                className="grid 
                grid-cols-[minmax(0,2.2fr)_minmax(0,3fr)_minmax(0,1fr)_minmax(0,1.3fr)_minmax(0,1.3fr)_180px]
                gap-4 items-center p-3 border-b border-gray-300 hover:bg-gray-100"
              >
                <span className="min-w-0 truncate">{product._id}</span>

                <span className="min-w-0 truncate font-medium">
                  {product.name}
                </span>

                <span>₹{product.price.toLocaleString("en-IN")}</span>

                <span className="min-w-0 truncate">{product.category}</span>

                <span className="min-w-0 truncate">{product.brand}</span>

                {/* Edit & Delete buttons */}
                {/* Prevent buttons from shrinking */}
                <div className="flex justify-center gap-2 shrink-0">
                  {loadingDelete && product._id === activeProductId ? (
                    <Loader className="size-6" />
                  ) : (
                    <>
                      <Link to={`/admin/product/${product._id}/edit`}>
                        <button className="flex items-center gap-1 px-3 py-1.5 bg-blue-500 text-white rounded-md hover:bg-blue-600 whitespace-nowrap cursor-pointer">
                          <FaEdit />
                          Edit
                        </button>
                      </Link>

                      <button
                        className="flex items-center gap-1 px-3 py-1.5 bg-red-500 text-white rounded-md hover:bg-red-600 whitespace-nowrap cursor-pointer"
                        onClick={() => deleteHandler(product._id)}
                      >
                        <FaTrash />
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* MOBILE */}
          <div className="lg:hidden flex flex-col gap-4 bg-slate-100">
            {data.products.map((product) => (
              <div
                key={product._id}
                className="rounded-lg p-4 shadow-sm bg-white flex flex-col gap-2"
              >
                <span className="text-gray-500 break-all">#{product._id}</span>

                <span className="font-semibold">{product.name}</span>

                <div className="text-sm text-gray-600">
                  <p>
                    <strong>Price:</strong> ₹
                    {product.price.toLocaleString("en-IN")}
                  </p>
                  <p>
                    <strong>Category:</strong> {product.category}
                  </p>
                  <p>
                    <strong>Brand:</strong> {product.brand}
                  </p>
                </div>

                {/* Edit & Delete buttons */}
                <div className="flex gap-3 mt-2">
                  {loadingDelete && product._id === activeProductId ? (
                    <Loader className="size-6" />
                  ) : (
                    <>
                      <Link to={`/admin/product/${product._id}/edit`}>
                        <button className="flex items-center gap-2 px-3 py-1.5 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                          <FaEdit />
                          Edit
                        </button>
                      </Link>

                      <button
                        className="flex items-center gap-2 px-3 py-1.5 bg-red-500 text-white rounded-md hover:bg-red-600"
                        onClick={() => deleteHandler(product._id)}
                      >
                        <FaTrash />
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {!isLoading && <Paginate pages={data.pages} page={data.page} isAdmin />}
    </div>
  );
};

export default ProductListPage;
