// Business rules for shipping. Product owns these numbers.

export const FREE_SHIPPING_THRESHOLD_CENTS = 7500;
export const MAX_PARCEL_WEIGHT_KG = 30;
export const HOME_COUNTRY = "US";
export const EUROPE_COUNTRIES = ["DE", "FR", "NL", "ES", "IT", "IE"];
export const BASE_RATE_CENTS: Record<string, number> = {
  domestic: 499,
  europe: 1299,
  international: 2499,
};
export const PER_KG_CENTS = 150;
