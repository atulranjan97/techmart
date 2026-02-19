// Local modules
import { useState, useEffect } from "react";
// External modules
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
// Custom modules
import {
  useGetProductDetailsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useUploadProductImageMutation,
} from "../../slices/productsApiSlice";
import Message from "../../components/Message";
import Loader from "../../components/Loader";

const ProductFormPage = () => {
  const { id: productId } = useParams();
  const isEditMode = Boolean(productId);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");

  const [fileName, setFileName] = useState("No file chosen");

  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsQuery(productId, { skip: !isEditMode });  // skip -> when not in edit mode, the query won't run

  const [createProduct, { isLoading: loadingCreate }] =
    useCreateProductMutation();

  const [updateProduct, { isLoading: loadingUpdate }] =
    useUpdateProductMutation();

  const [uploadProductImage, { isLoading: loadingUpload }] =
    useUploadProductImageMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setBrand(product.brand);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescription(product.description);
    }
  }, [product]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      if (isEditMode) {
        await updateProduct({
          productId,
          name,
          price,
          image,
          brand,
          category,
          countInStock,
          description,
        }).unwrap();

        toast.success("Product updated");
      } else {
        await createProduct({
          name,
          price,
          image,
          brand,
          category,
          countInStock,
          description,
        }).unwrap();

        toast.success("Product created");
      }

      navigate("/admin/productlist");
    } catch (err) {
      toast.error(err?.data?.message || "Something went wrong");
    }
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData(); // `FormData` is a browser API used to send data in `multipart/form-data`
    setFileName(e.target.files[0].name);
    formData.append("image", e.target.files[0]);
    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="max-w-7xl p-3 mx-auto">
      {/* Go back button */}
      <Link
        to={"/admin/productlist"}
        className="hidden lg:block w-fit px-2 py-1 border rounded-sm mb-4"
      >
        Go Back
      </Link>
      <div className="w-full lg:max-w-4xl bg-white rounded-xl p-4 lg:p-8 mx-auto border border-slate-300 my-5">
        <h2 className="text-2xl font-semibold mb-5">
          {isEditMode ? "Edit Product" : "Create Product"}
        </h2>

        {loadingUpdate && <Loader />}

        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">
            {error?.data?.message || error.error}
          </Message>
        ) : (
          <form className="space-y-4" onSubmit={submitHandler}>
            {/* Product Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-semibold mb-1"
              >
                Product Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Enter product name"
              />
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="desc"
                className="block text-sm font-semibold mb-1"
              >
                Description
              </label>
              <textarea
                type="text"
                name="description"
                rows={"4"}
                id="desc"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Enter product description"
              />
            </div>

            {/* Price */}
            <div>
              <label
                htmlFor="price"
                className="block text-sm font-semibold mb-1"
              >
                Price
              </label>
              <input
                type="number"
                name="price"
                id="price"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Enter price"
              />
            </div>

            {/* Count In Stocks */}
            <div>
              <label
                htmlFor="countinstock"
                className="block text-sm font-semibold mb-1"
              >
                Count In Stocks
              </label>
              <input
                type="number"
                name="countInStock"
                id="countinstock"
                value={countInStock}
                onChange={(e) => setCountInStock(Number(e.target.value))}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Enter Count in stocks"
              />
            </div>

            {/* Brand */}
            <div>
              <label
                htmlFor="brand"
                className="block text-sm font-semibold mb-1"
              >
                Brand
              </label>
              <input
                type="text"
                name="brand"
                id="brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Enter brand name"
              />
            </div>

            {/* Category */}
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-semibold mb-1"
              >
                Category
              </label>
              <input
                type="text"
                name="category"
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Enter product category"
              />
            </div>

            {/* Image */}
            <div>
              <label
                htmlFor="image"
                className="block text-sm font-semibold mb-1"
              >
                Image
              </label>
              <input
                type="text"
                name="image"
                id="image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Enter"
              />

              {loadingUpload ? (
                <Loader className="size-6 mt-2" />
              ) : (
                <div className="border border-gray-300 flex gap-2 items-center text-sm mt-2">
                  <label
                    htmlFor="fileInput"
                    className="cursor-pointer bg-gray-200 px-2 py-1"
                  >
                    Choose File
                  </label>
                  <input
                    type="file"
                    id="fileInput"
                    hidden
                    onChange={uploadFileHandler}
                  />
                  <p className="">{fileName}</p>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loadingUpdate || loadingCreate}
              className="w-full cursor-pointer bg-techmart-color text-white py-2 rounded-md hover:bg-techmart-dark transition mt-4 disabled:opacity-50"
            >
              {isEditMode ? "Update Product" : "Create Product"}
            </button>

            {isLoading && <Loader />}
          </form>
        )}
      </div>
    </div>
  );
};

export default ProductFormPage;
