function addDecimals(num) {
  return (Math.round(num * 100) / 100).toFixed(2);
}
// `addDecimals(num)` rounds a price to exactly 2 decimal places to avoid JavaScript rounding errors in cart totals.
// num*100 -> converts rupees to paisa
// Math.round(result) -> fix floating point issue by rounding the figure
// result/100 -> convert it back to rupee
// .toFixed(2) -> force two decimal places

const calcPrices = (items) => {
  // Calculate the items price
  const itemsPrice = addDecimals(
    items.reduce((acc, item) => acc + item.price * item.qty, 0),
  );
  // Calculate the shipping price
  const shippingPrice = addDecimals(itemsPrice > 100 ? 0 : 10);
  // Calculate the tax price
  const taxPrice = addDecimals(Number((0.18 * itemsPrice).toFixed(2)));
  // Calculate the total price
  const totalPrice = (
    Number(itemsPrice) +
    Number(shippingPrice) +
    Number(taxPrice)
  ).toFixed(2);

  return { itemsPrice, shippingPrice, taxPrice, totalPrice };
};

export default calcPrices;
