import calcPrices from "./calcPrices";

const updateCart = (state) => {
    const {itemsPrice, shippingPrice, taxPrice, totalPrice} = calcPrices(state.cartItems);

    state.itemsPrice = itemsPrice;
    state.shippingPrice = shippingPrice;
    state.taxPrice = taxPrice;
    state.totalPrice = totalPrice;

    localStorage.setItem('cart', JSON.stringify(state));

    return state;
}


export { updateCart };