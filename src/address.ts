import type { Address } from "./types.ts";

export type AddressProblem = { field: keyof Address; message: string };

export function normalizePostcode(postcode: string): string {
  return postcode.replace(/\s+/g, "").toUpperCase();
}

export function validateAddress(address: Address): AddressProblem[] {
  const problems: AddressProblem[] = [];
  if (!address.name.trim()) problems.push({ field: "name", message: "Name is required" });
  if (!address.street.trim()) problems.push({ field: "street", message: "Street is required" });
  if (!address.city.trim()) problems.push({ field: "city", message: "City is required" });
  if (normalizePostcode(address.postcode).length < 4) problems.push({ field: "postcode", message: "Postcode looks too short" });
  if (!/^[A-Z]{2}$/.test(address.country)) problems.push({ field: "country", message: "Use a two-letter country code" });
  return problems;
}
