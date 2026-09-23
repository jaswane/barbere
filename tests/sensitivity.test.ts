import assert from "node:assert/strict";
import { test } from "node:test";
import type { Answers } from "../data/questions.ts";
import type { Product, SensitivityLevel } from "../data/types.ts";
import { rankProducts, scoreProduct } from "../lib/selector.ts";

/** Syntetiske produkter som er like i alt unntatt sensitivitet. */
function fixture(id: string, level: SensitivityLevel): Product {
  return {
    id,
    brand: "Test",
    model: id,
    category: "barbermaskin",
    productType: "Testprodukt",
    targets: ["face"],
    finishes: ["smooth"],
    method: "electric",
    sensitivity: level === "neutral" ? { level } : { level, sourceId: "test" },
    referencePrice: { amount: 900, checkedAt: "2026-09-23", sourceId: "test" },
    bestFor: "Test",
    features: [],
    reasons: { target: "test", finish: "test", sensitive: level === "neutral" ? undefined : "test" },
    specSourceIds: ["test"],
    sources: [{ id: "test", label: "Test", url: "https://example.com", retrievedAt: "2026-09-23" }],
    status: "active",
  };
}

const recommended = fixture("c-recommended", "recommended");
const neutral = fixture("b-neutral", "neutral");
const avoid = fixture("a-avoid", "avoid");
const all = [avoid, neutral, recommended];

const answers = (sensitive: Answers["sensitive"]): Answers => ({ target: "face", finish: "smooth", sensitive, method: "unsure", budget: "mid" });

test("recommended rangeres over ellers lik neutral ved sensitiv hud", () => {
  const order = rankProducts(answers("yes"), all).map((item) => item.product.id);
  assert.ok(order.indexOf("c-recommended") < order.indexOf("b-neutral"));
  assert.equal(scoreProduct(recommended, answers("yes")) - scoreProduct(neutral, answers("yes")), 16);
});

test("neutral får 0 sensitivitetspoeng og behandles ikke som uegnet", () => {
  assert.equal(scoreProduct(neutral, answers("yes")), scoreProduct(neutral, answers("no")));
});

test("avoid rangeres under ellers lik neutral ved sensitiv hud", () => {
  const order = rankProducts(answers("yes"), all).map((item) => item.product.id);
  assert.deepEqual(order, ["c-recommended", "b-neutral", "a-avoid"]);
  assert.equal(scoreProduct(neutral, answers("yes")) - scoreProduct(avoid, answers("yes")), 16);
});

test("uten sensitiv hud gir alle tre nivåene samme poeng", () => {
  const scores = all.map((product) => scoreProduct(product, answers("no")));
  assert.equal(new Set(scores).size, 1);
  // Likt poeng og lik pris: rekkefølgen avgjøres av id.
  assert.deepEqual(rankProducts(answers("no"), all).map((item) => item.product.id), ["a-avoid", "b-neutral", "c-recommended"]);
});
