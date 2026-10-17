// Price helpers. All prices are stored as whole cents.

const SYMBOLS: Record<string, string> = { USD: "$", EUR: "€", GBP: "£" };

function padCents(cents: number): string {
  return String(Math.abs(cents) % 100).padStart(2, "0");
}

export function formatPrice(cents: number, currency = "USD"): string {
  const symbol = SYMBOLS[currency] ?? `${currency} `;
  const whole = Math.floor(Math.abs(cents) / 100);
  const sign = cents < 0 ? "-" : "";
  return `${sign}${symbol}${whole}.${padCents(cents)}`;
}
