import { test } from "node:test";
import assert from "node:assert/strict";
import { advanceStatus, isFinalStatus, STATUS_LABELS } from "../src/tracking.ts";

test("status moves forward one step per scan", () => {
  assert.equal(advanceStatus("label_created"), "in_transit");
  assert.equal(advanceStatus("in_transit"), "out_for_delivery");
  assert.equal(advanceStatus("out_for_delivery"), "delivered");
  assert.equal(advanceStatus("delivered"), "delivered");
});

test("delivered and returned are final", () => {
  assert.ok(isFinalStatus("delivered"));
  assert.ok(!isFinalStatus("in_transit"));
});

test("every status has a customer label", () => {
  assert.equal(STATUS_LABELS.out_for_delivery, "Out for delivery");
});
