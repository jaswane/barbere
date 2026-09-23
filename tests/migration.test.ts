import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { test } from "node:test";
import { rankProducts } from "../lib/selector.ts";
import { demoProducts } from "./fixtures/demo-products.ts";
import { allCombinations, combinationKey } from "./helpers.ts";

/*
 * Overgangstest for Phase 2C: den nye modellen (tredelt sensitivitet, method, referansepris,
 * tie-break med id) skal gi de samme 192 hovedvinnerne på de gamle demodataene som før.
 * Fasiten ble lagret fra den gamle koden før migreringen.
 */
const before: Record<string, string> = JSON.parse(
  fs.readFileSync(path.join(import.meta.dirname, "fixtures", "demo-winners-before-2c.json"), "utf8"),
);

test("den nye modellen gir samme 192 vinnere på demodataene som før migreringen", () => {
  assert.equal(Object.keys(before).length, 192);
  const changed: string[] = [];
  for (const answers of allCombinations()) {
    const key = combinationKey(answers);
    const winner = rankProducts(answers, demoProducts)[0].product.id;
    if (winner !== before[key]) changed.push(`${key}: ${before[key]} -> ${winner}`);
  }
  assert.deepEqual(changed, []);
});
