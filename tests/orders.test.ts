import { test } from "node:test";
import assert from "node:assert/strict";
import { FREE_SHIPPING_THRESHOLD_CENTS } from "../src/config.ts";
import { createShipment } from "../src/orders.ts";
import type { Order } from "../src/types.ts";

const order = (over: Partial<Order> = {}): Order => ({
  orderId: "A-100",
  customerEmail: "sam@example.com",
  subtotalCents: 2000,
  weightKg: 1,
  address: { name: "Sam Lee", street: "1 Main St", city: "Austin", postcode: "73301", country: "US" },
  ...over,
});

test("domestic orders over the threshold ship free", () => {
  assert.equal(createShipment(order({ subtotalCents: FREE_SHIPPING_THRESHOLD_CENTS })).shippingCents, 0);
});

test("small domestic orders pay shipping", () => {
  assert.equal(createShipment(order({ subtotalCents: FREE_SHIPPING_THRESHOLD_CENTS - 1 })).shippingCents, 499);
});

test("a bad address is rejected", () => {
  assert.throws(() => createShipment(order({ address: { ...order().address, city: "" } })), /City is required/);
});

test("new shipments start with a label", () => {
  assert.equal(createShipment(order()).status, "label_created");
});
