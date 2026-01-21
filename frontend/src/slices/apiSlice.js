import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../constants';

const baseQuery = fetchBaseQuery({baseUrl: BASE_URL});

export const apiSlice = createApi({
    baseQuery,      // baseQuery: baseQuery,
    tagTypes: ['Product', 'Order', 'User'],
    // tagTypes are used to define the type of data the we'll be fetching from our API, we are going to keep those singular 
    endpoints: (builder) => ({})
    // we don't have to manually fetch our data like we don't have to do our try-catch with a fetchApi inside of it and error handling and all that, we can do that all through this builder   
});

// Slice is the concept in redux toolkit, it's a way to organize your state so it's a collection of reducers and actions that are related to each other
// We can create multiple slices in our application and each slice can have it's own state
// Since we're working with a backend API, basically we're gonna have a routeApi slice and then we'll extend that with the productApi slice, the orderApi slice, the usersApi slice, so right now we just want to get that base API slice

// This is basically gonna be a parent to the other api slices.
// So there is a `createSlice` which you'd use for regular slices that aren't dealing with asynchronous requests such as the cart for instance we'll have cart slice but since we're dealing a backend API we're gonna bring in `createApi` which works a little bit differently
// `fetchBaseQuery` is the function that will allow us to make request to our backend API 

// next we'll create productApiSlice and start to fetch our data through redux rather than just through fetchApi inside of a useEffect


