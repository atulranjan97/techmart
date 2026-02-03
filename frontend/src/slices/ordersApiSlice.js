// we're gonna bring the initial apiSlice which is basically like the parent to the rest of these api slices which is users, products and orders
import { apiSlice } from './apiSlice'
import { ORDERS_URL } from '../constants'   // /api/orders

const orderApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (order) => ({
                url: ORDERS_URL,
                method: 'POST',
                body: {...order}
            })
        })
    })
});

export const { useCreateOrderMutation } = orderApiSlice; 