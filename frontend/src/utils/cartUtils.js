
export const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
}
// `addDecimals(num)` rounds a price to exactly 2 decimal places to avoid JavaScript rounding errors in cart totals.
    // num*100 -> converts rupees to paisa
    // Math.round(result) -> fix floating point issue by rounding the figure
    // result/100 -> convert it back to rupee
    // .toFixed(2) -> force two decimal places


const updateCart = (state) => {
    // Calculate items price
    state.itemsPrice = addDecimals(state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0));

    // Calculate shipping price (If order is over Rs. 499 then free, else Rs. 50 shipping)
    state.shippingPrice = addDecimals(state.itemsPrice > 499 ? 0 : 50);

    // Calculate tax price (18% tax)
    state.taxPrice = addDecimals(Number((0.18 * Number(state.itemsPrice)).toFixed(2)));

    // Calculate total price
    state.totalPrice = (
        Number(state.itemsPrice) +
        Number(state.shippingPrice) +
        Number(state.taxPrice) 
    ).toFixed(2);

    localStorage.setItem('cart', JSON.stringify(state));

    return state;
}

const updateBuyNow = (state) => {
    const item = state.buyNowItem.item[0];
    const itemsPrice = item.price * item.qty;

    state.buyNowItem.itemsPrice = itemsPrice;
    state.buyNowItem.shippingPrice = itemsPrice > 499 ? 0 : 50;
    state.buyNowItem.taxPrice = Number((0.18 * itemsPrice).toFixed(2));
    state.buyNowItem.totalPrice = (
        state.buyNowItem.itemsPrice +
        state.buyNowItem.shippingPrice +
        state.buyNowItem.taxPrice 
    );

    return state;
}

export {updateCart, updateBuyNow};