// Price helpers. All prices are stored as whole cents.

const SYMBOLS: Record<string, string> = { USD: "$", EUR: "€", GBP: "£" };

function padCents(cents: number): string {
  const rest = Math.abs(cents) % 100;
  return rest < 10 ? `0${rest}` : String(rest);
}

export function formatPrice(cents: number, currency = "USD"): string {
  const symbol = SYMBOLS[currency] ?? `${currency} `;
  const whole = Math.floor(Math.abs(cents) / 100);
  const sign = cents < 0 ? "-" : "";
  return `${sign}${symbol}${whole}.${padCents(cents)}`;
}
