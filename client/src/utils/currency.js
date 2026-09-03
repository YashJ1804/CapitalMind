export const formatCurrency = (amount, currency = "USD", usdToInr = 1) => {
    const value =
        currency === "INR"
            ? amount * usdToInr
            : amount;

    return new Intl.NumberFormat(
        currency === "INR" ? "en-IN" : "en-US",
        {
            style: "currency",
            currency,
            maximumFractionDigits: 2,
        }
    ).format(value);
};