import { normalizePostcode } from "./address.ts";
import type { Shipment } from "./types.ts";

// Plain-text label for the thermal printer, 40 characters wide.
export function printLabel(shipment: Shipment): string {
  const a = shipment.address;
  return [
    "PARCELPOST".padEnd(40, " "),
    `TRACKING ${shipment.trackingId}`,
    "",
    a.name.toUpperCase(),
    a.street.toUpperCase(),
    `${normalizePostcode(a.postcode)} ${a.city.toUpperCase()}`,
    a.country,
  ].join("\n");
}
