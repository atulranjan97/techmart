import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './slices/apiSlice';
import cartSliceReducer from './slices/cartSlice';
import authSliceReducer from './slices/authSlice'

const store = configureStore({
    reducer: {
        // Add the apiSlice reducer to the store
        // The key must match the reducerPath ('api')
        [apiSlice.reducerPath]: apiSlice.reducer,

        cart: cartSliceReducer,
        auth: authSliceReducer,
    },
    // Adding the api middleware enables caching, invalidation, and polling
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
})

export default store;


// console.log(apiSlice.reducerPath);  // api
// console.log(apiSlice.reducer)
