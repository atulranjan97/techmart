import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [] };

// make sure to have the right amount of decimals and it's formatted correctly()
const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
}
// `addDecimals(num)` rounds a price to exactly 2 decimal places to avoid JavaScript rounding errors in cart totals.
    // num*100 -> converts rupees to paisa
    // Math.round(result) -> fix floating point issue by rounding the figure
    // result/100 -> convert it back to rupee
    // .toFixed(2) -> force two decimal places

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
        const item = action.payload;

        const itemExist = state.cartItems.find((x) => x._id === item._id);

        if (itemExist) {
            state.cartItems = state.cartItems.map((x) => x._id === itemExist._id ? item : x);
        } else {
            state.cartItems = [...state.cartItems, item];
        }

        // Calculate items price
        state.itemsPrice = addDecimals(state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0));

        // Calculate shipping price (If order is over Rs. 499 then free, else Rs. 50 shipping)
        state.shippingPrice = addDecimals(state.itemsPrice > 499 ? 50 : 0);

        // Calculate tax price (18% tax)
        state.taxPrice = addDecimals(Number((0.18 * Number(state.itemsPrice)).toFixed(2)));

        // Calculate total price
        state.total = (
            Number(state.itemsPrice) +
            Number(state.shippingPrice) +
            Number(state.taxPrice) 
        ).toFixed(2);

        localStorage.setItem('cart', JSON.stringify(state));
    },
  },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
