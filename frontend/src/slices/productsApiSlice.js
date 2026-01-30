import { PRODUCTS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const productApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // A "query" is for fetching data (GET)
        getProducts: builder.query({
            query: () => ({
                url: PRODUCTS_URL,
            }),
            keepUnusedDataFor: 5,
        }),
        getProductDetails: builder.query({
           query: (productId) => ({
                url: `${PRODUCTS_URL}/${productId}`, 
           }),
           keepUnusedDataFor: 5,
        })
    }),
    // any endpoint that we wanna hit that have to do with products will go in here and we can use this builder object which has methods like query, so we can make a query
});


// Export the auto-generated hooks
// RTK Query auto-generates hooks based on the endpoint names
export const { useGetProductsQuery, useGetProductDetailsQuery } = productApiSlice;



// this productApiSlice is injecting endpoint into the main apiSlice,


