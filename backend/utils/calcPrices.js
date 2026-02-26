import { usdConversion } from "./usdConversion.js";

function addDecimals(num) {
  return (Math.round(num * 100) / 100).toFixed(2);
}

async function calcPrices(orderItems) {
  // Calculate the items price
  const itemsPrice = addDecimals(
    orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
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
  // Calculate USD conversion of total price
  const usdPrice = await usdConversion(Number(totalPrice));

  return { itemsPrice, shippingPrice, taxPrice, totalPrice, usdPrice };
}

export { calcPrices };