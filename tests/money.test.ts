import { test } from "node:test";
import assert from "node:assert/strict";
import { formatPrice } from "../src/money.ts";

test("formats cents as a price", () => {
  assert.equal(formatPrice(499), "$4.99");
  assert.equal(formatPrice(1205, "EUR"), "€12.05");
  assert.equal(formatPrice(-50), "-$0.50");
});
