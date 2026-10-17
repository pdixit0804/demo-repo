import { test } from "node:test";
import assert from "node:assert/strict";
import { calculateShippingCost, getZoneForCountry } from "../src/rates.ts";

test("first kilo is included in the base rate", () => {
  assert.equal(calculateShippingCost(1, "domestic"), 499);
  assert.equal(calculateShippingCost(0.4, "europe"), 1299);
});

test("each started extra kilo costs 1.50", () => {
  assert.equal(calculateShippingCost(2.2, "domestic"), 499 + 2 * 150);
});

test("heavy parcels are refused", () => {
  assert.throws(() => calculateShippingCost(31, "international"));
});

test("zones by country", () => {
  assert.equal(getZoneForCountry("US"), "domestic");
  assert.equal(getZoneForCountry("FR"), "europe");
  assert.equal(getZoneForCountry("JP"), "international");
});
