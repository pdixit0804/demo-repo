import { test } from "node:test";
import assert from "node:assert/strict";
import { getQuote, getShipment } from "../src/api/routes.ts";

test("quote for a European parcel", () => {
  assert.deepEqual(getQuote({ country: "DE", weightKg: "2.5" }).body, { zone: "europe", cents: 1599, display: "$15.99" });
});

test("unknown tracking number is a 404", () => {
  assert.equal(getShipment("PP2026999999").status, 404);
});
