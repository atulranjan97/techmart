// Custom Module
import { USERS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // A "mutation" is for changing data (POST, PUT, DELETE)
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: "POST",
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
    }),
    profile: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation, useRegisterMutation, useProfileMutation } =
  usersApiSlice;

// now we should be able to dispatch login action from our login screen
// we don't have to worry about sending the token manually to every protected route because it's always gonna be sent, when you store it in HTTP only cookie, it's gonna be sent until it's destroyed. So I prefer this way over storing it on the client.
// it does the same exact thing as authentication except it creates the new user
