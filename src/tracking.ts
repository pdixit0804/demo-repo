import type { Shipment, TrackingStatus, Zone } from "./types.ts";

export const STATUS_LABELS: Record<TrackingStatus, string> = {
  label_created: "Label created",
  shipped: "Shipped",
  out_for_delivery: "Out for delivery",
  delivered: "Delivered",
  returned: "Returned to sender",
};

const TRANSIT_DAYS: Record<Zone, number> = { domestic: 2, europe: 5, international: 9 };

let counter = 0;
export function newTrackingId(now: Date): string {
  counter += 1;
  return `PP${now.getUTCFullYear()}${String(counter).padStart(6, "0")}`;
}

export function estimateDelivery(shipment: Shipment): Date {
  const eta = new Date(shipment.createdAt);
  eta.setUTCDate(eta.getUTCDate() + TRANSIT_DAYS[shipment.zone]);
  return eta;
}

export function isFinalStatus(status: TrackingStatus): boolean {
  return status === "delivered" || status === "returned";
}

export function advanceStatus(status: TrackingStatus): TrackingStatus {
  if (status === "label_created") return "shipped";
  if (status === "shipped") return "out_for_delivery";
  if (status === "out_for_delivery") return "delivered";
  return status;
}
