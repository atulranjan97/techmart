import { PRODUCTS_URL, UPLOAD_URL } from "../constants"; // PRODUCTS_URL: /api/products, UPLOAD_URL: /api/upload
import { apiSlice } from "./apiSlice";

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // A "query" is for fetching data (GET)
    getProducts: builder.query({
      query: ({ keyword, pageNumber }) => ({
        url: PRODUCTS_URL,
        params: {
          // In RTK query, `params` generates query strings(ie. ?pageNumber=3). Express reads them from `req.query`
          pageNumber,
          keyword,
        },
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
    createProduct: builder.mutation({
      query: (data) => ({
        url: PRODUCTS_URL,
        method: "POST",
        body: data,
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
      }),
    }),
    createReview: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}/${data.productId}/reviews`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["PRODUCTS"],
    }),
    getTopProducts: builder.query({
      query: () => ({
        url: `${PRODUCTS_URL}/top`,
      }),
      keepUnusedDataFor: 5,
    }),
    getLatestProduct: builder.query({
      query: () => ({
        url: `${PRODUCTS_URL}/latest`,
      }),
      keepUnusedDataFor: 5,
    })
  }),
  // any endpoint that we wanna hit that have to do with products will go in here and we can use this builder object which has methods like query, so we can make a query
});

// Export the auto-generated hooks (RTK Query auto-generates hooks based on the endpoint names)
export const {
  useGetProductsQuery,
  useGetProductDetailsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useUploadProductImageMutation,
  useDeleteProductMutation,
  useCreateReviewMutation,
  useGetTopProductsQuery,
  useGetLatestProductQuery,
} = productApiSlice;

// this productApiSlice is injecting endpoint into the main apiSlice,
