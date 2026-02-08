import { createSlice } from "@reduxjs/toolkit";
import { updateCart, updateBuyNow } from "../utils/cartUtils";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : {
      cartItems: [],
      // buyNowItem: [],
      buyNowItem: {},
      shippingAddress: {},
      paymentMethod: "Paypal",
    };
// we set Paypal as the default value of paymentMethod, you can also integrate stripe but we are using paypal

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.buyNowItem = [];
      const item = action.payload;

      const itemExist = state.cartItems.find((x) => x._id === item._id);

      if (itemExist) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === itemExist._id ? item : x,
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }

      return updateCart(state);
    },
    addBuyNowItem: (state, action) => {
      const item = action.payload;
      // state.buyNowItem = [item];
      
      state.buyNowItem = { item: [item]};

      return updateBuyNow(state);
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload,
      );

      return updateCart(state);
    },
    clearBuyNowItem: (state) => {
      state.buyNowItem = {};
      return updateCart(state);
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      return updateCart(state);
    },
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      return updateCart(state);
    },
    clearCartItems: (state) => {
      state.cartItems = [];
      return updateCart(state);
    },
  },
});

export const {
  addToCart,
  addBuyNowItem,
  removeFromCart,
  clearBuyNowItem,
  saveShippingAddress,
  savePaymentMethod,
  clearCartItems,
} = cartSlice.actions;

export default cartSlice.reducer;
