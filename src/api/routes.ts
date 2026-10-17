import { createShipment } from "../orders.ts";
import { calculateShippingCost, getZoneForCountry } from "../rates.ts";
import { STATUS_LABELS, advanceStatus, estimateDelivery } from "../tracking.ts";
import { formatPrice } from "../money.ts";
import { printLabel } from "../labels.ts";
import { HttpError, toResponse } from "./errors.ts";
import type { Order, Shipment } from "../types.ts";

const shipments = new Map<string, Shipment>();

// GET /quote?country=DE&weightKg=2.5
export function getQuote(query: { country: string; weightKg: string }) {
  try {
    const zone = getZoneForCountry(query.country);
    const cents = calculateShippingCost(Number(query.weightKg), zone);
    return { status: 200, body: { zone, cents, display: formatPrice(cents) } };
  } catch (err) {
    return toResponse(err);
  }
}

// POST /shipments
export function postShipment(order: Order) {
  try {
    const shipment = createShipment(order);
    shipments.set(shipment.trackingId, shipment);
    return { status: 201, body: { trackingId: shipment.trackingId, label: printLabel(shipment) } };
  } catch (err) {
    return toResponse(err);
  }
}

// GET /shipments/:trackingId
export function getShipment(trackingId: string) {
  const shipment = shipments.get(trackingId);
  if (!shipment) return toResponse(new HttpError(404, "No shipment with that tracking number"));
  return {
    status: 200,
    body: { status: shipment.status, label: STATUS_LABELS[shipment.status], eta: estimateDelivery(shipment).toISOString() },
  };
}

// POST /shipments/:trackingId/scan (called by the warehouse scanner)
export function scanShipment(trackingId: string) {
  const shipment = shipments.get(trackingId);
  if (!shipment) return toResponse(new HttpError(404, "No shipment with that tracking number"));
  shipment.status = advanceStatus(shipment.status);
  return { status: 200, body: { status: shipment.status } };
}
