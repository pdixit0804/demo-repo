import { formatPrice } from "./money.ts";
import { STATUS_LABELS, estimateDelivery } from "./tracking.ts";
import type { Shipment } from "./types.ts";

export type Email = { to: string; subject: string; body: string };

export function shipmentCreatedEmail(shipment: Shipment, to: string): Email {
  const eta = estimateDelivery(shipment).toDateString();
  const cost = shipment.shippingCents === 0 ? "Free" : formatPrice(shipment.shippingCents);
  return {
    to,
    subject: `Your order ${shipment.orderId} is ready to ship`,
    body: `Tracking number: ${shipment.trackingId}\nShipping: ${cost}\nExpected by: ${eta}`,
  };
}

export function statusChangedEmail(shipment: Shipment, to: string): Email | null {
  // Customers only hear about the steps they care about.
  if (shipment.status === "label_created") return null;
  const label = STATUS_LABELS[shipment.status];
  const subject =
    shipment.status === "out_for_delivery" ? "Your parcel arrives today" : `Parcel update: ${label}`;
  return { to, subject, body: `Tracking number ${shipment.trackingId} is now: ${label}.` };
}
