import { BASE_RATE_CENTS, EUROPE_COUNTRIES, HOME_COUNTRY, MAX_PARCEL_WEIGHT_KG, PER_KG_CENTS } from "./config.ts";
import type { Zone } from "./types.ts";

export function getZoneForCountry(country: string): Zone {
  if (country === HOME_COUNTRY) return "domestic";
  if (EUROPE_COUNTRIES.includes(country)) return "europe";
  return "international";
}

// Price in cents for one parcel. The first kilo is included in the base rate.
export function calculateShippingCost(weightKg: number, zone: Zone): number {
  if (weightKg <= 0) throw new Error("Parcel weight must be positive");
  if (weightKg > MAX_PARCEL_WEIGHT_KG) throw new Error(`Parcels over ${MAX_PARCEL_WEIGHT_KG} kg are not accepted`);
  const extraKg = Math.max(0, Math.ceil(weightKg) - 1);
  return BASE_RATE_CENTS[zone] + extraKg * PER_KG_CENTS;
}
