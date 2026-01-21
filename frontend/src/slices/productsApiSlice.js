import { PRODUCTS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const productApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
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
// as you can see we're not have to do a fetch request or an axios request to do this, we do it all through redux toolkit

export const { useGetProductsQuery, useGetProductDetailsQuery } = productApiSlice;

// we use this `useGetProductQuery` whenever we want to use this and fetch our data
// this productApiSlice is injecting endpoint into the main apiSlice,


