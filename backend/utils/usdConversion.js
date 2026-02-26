const usdConversion = async (amount) => {
  const res = await fetch(
    "https://v6.exchangerate-api.com/v6/50a3f8fb86e5b6309acb263b/latest/USD",
  );
  const data = await res.json();
  const conversion_rates = data.conversion_rates?.INR;
  return (amount / conversion_rates).toFixed(2);
};

export { usdConversion };
