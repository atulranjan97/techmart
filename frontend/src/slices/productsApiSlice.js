import { PRODUCTS_URL, UPLOAD_URL } from "../constants"; // PRODUCTS_URL: /api/products, UPLOAD_URL: /api/upload
import { apiSlice } from "./apiSlice";

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // A "query" is for fetching data (GET)
    getProducts: builder.query({
      query: () => ({
        url: PRODUCTS_URL,
      }),
      providesTags: ["Products"], // Marks this query's data as cached under "Products" so it can be auto-refetched when invalidated.
      keepUnusedDataFor: 5, // RTK Query will keep the data in cache for 5 seconds after no component is using it.
    }),
    getProductDetails: builder.query({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
      }),
      keepUnusedDataFor: 5, // It controls how long cached data survives after the UI stops using it.
    }),
    prepareBuyNowProduct: builder.mutation({
      query: ({ productId, qty }) => ({
        url: `${PRODUCTS_URL}/checkout`, // /api/products/checkout
        method: "POST",
        body: { productId, qty },
      }),
    }),
    createProduct: builder.mutation({
      query: () => ({
        url: PRODUCTS_URL,
        method: "POST",
      }),
      invalidatesTags: ["Products"], //  Tells RTK Query the "Products" cache is stale and should be refetched.
    }),
    updateProduct: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}/${data.productId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Products"], // to clear the cache
    }),
    uploadProductImage: builder.mutation({
      query: (data) => ({
        url: UPLOAD_URL,
        method: "POST",
        body: data,
      }),
    }),
    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
        method: "DELETE",
      })
    })
  }),
  // any endpoint that we wanna hit that have to do with products will go in here and we can use this builder object which has methods like query, so we can make a query
});

// Export the auto-generated hooks
// RTK Query auto-generates hooks based on the endpoint names
export const {
  useGetProductsQuery,
  useGetProductDetailsQuery,
  usePrepareBuyNowProductMutation,
  useCreateProductMutation,
  useUpdateProductMutation,
  useUploadProductImageMutation,
  useDeleteProductMutation,
} = productApiSlice;

// this productApiSlice is injecting endpoint into the main apiSlice,
