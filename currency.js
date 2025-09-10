
export const CURRENCIES = {
  SAR: { label: 'SAR', symbol: 'ر.س' },
  AED: { label: 'AED', symbol: 'د.إ' },
  USD: { label: 'USD', symbol: '$' },
};

// Base prices stored in AED by default. Adjust rates as needed.
export const RATES = {
  AED: 1,
  SAR: 1.02, // approx; update to live rates later
  USD: 0.27,
};

export function convert(amountAED, to) {
  const rate = RATES[to] ?? 1;
  return amountAED * rate;
}

export function formatCurrency(value, code) {
  try {
    return new Intl.NumberFormat(code === 'USD' ? 'en-US' : 'ar-SA', {
      style: 'currency',
      currency: code,
      currencyDisplay: 'symbol',
      maximumFractionDigits: 2
    }).format(value);
  } catch {
    return `${value.toFixed(2)} ${code}`;
  }
}
