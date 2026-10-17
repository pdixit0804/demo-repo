import { validateAddress } from "./address.ts";
import { FREE_SHIPPING_THRESHOLD_CENTS } from "./config.ts";
import { getShippingQuote, getZoneForCountry } from "./rates.ts";
import { newTrackingId } from "./tracking.ts";
import type { Order, Shipment } from "./types.ts";

export function createShipment(order: Order, now = new Date()): Shipment {
  const problems = validateAddress(order.address);
  if (problems.length) throw new Error(`Bad address: ${problems.map((p) => p.message).join(", ")}`);

  const zone = getZoneForCountry(order.address.country);
  const freeShipping = zone === "domestic" && order.subtotalCents >= FREE_SHIPPING_THRESHOLD_CENTS;
  const shippingCents = freeShipping ? 0 : getShippingQuote(order.weightKg, zone);

  return {
    trackingId: newTrackingId(now),
    orderId: order.orderId,
    zone,
    shippingCents,
    status: "label_created",
    address: order.address,
    createdAt: now,
  };
}
