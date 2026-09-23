import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { test } from "node:test";
import { activeProducts } from "../data/products.ts";
import { rankProducts } from "../lib/selector.ts";
import { allCombinations, combinationKey } from "./helpers.ts";

/*
 * Fastfrosset resultat for alle 192 kombinasjoner med det ekte datasettet. Endres dataene eller
 * logikken, feiler testen til snapshotet er generert på nytt og endringen er gjennomgått:
 *   UPDATE_SNAPSHOT=1 npm test
 */
const snapshotPath = path.join(import.meta.dirname, "__snapshots__", "selector-192.json");

function currentResults(list = activeProducts): Record<string, string[]> {
  const results: Record<string, string[]> = {};
  for (const answers of allCombinations()) {
    results[combinationKey(answers)] = rankProducts(answers, list).slice(0, 3).map((item) => item.product.id);
  }
  return results;
}

test("resultatene for alle 192 kombinasjoner matcher snapshotet", () => {
  const current = currentResults();
  if (process.env.UPDATE_SNAPSHOT === "1") {
    fs.mkdirSync(path.dirname(snapshotPath), { recursive: true });
    fs.writeFileSync(snapshotPath, JSON.stringify(current, null, 2) + "\n");
  }
  assert.ok(fs.existsSync(snapshotPath), "Snapshot mangler. Kjør UPDATE_SNAPSHOT=1 npm test og gå gjennom resultatet.");
  const saved = JSON.parse(fs.readFileSync(snapshotPath, "utf8"));
  assert.deepEqual(current, saved);
});

test("rangeringen er deterministisk og uavhengig av rekkefølgen i dataene", () => {
  const forward = currentResults();
  assert.deepEqual(currentResults(), forward);
  assert.deepEqual(currentResults([...activeProducts].reverse()), forward);
});
