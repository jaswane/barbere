import assert from "node:assert/strict";
import { test } from "node:test";
import type { Answers, Target } from "../data/questions.ts";
import type { Product, SensitivityLevel } from "../data/types.ts";
import { isMadeFor, rankProducts, scoreProduct } from "../lib/selector.ts";

/** Syntetiske trimmere som bare skiller seg på det testen gjelder. */
function trimmer(id: string, options: { targets: Target[]; primary: Target[]; price: number; sensitivity?: SensitivityLevel }): Product {
  const level = options.sensitivity ?? "neutral";
  return {
    id,
    brand: "Test",
    model: id,
    category: "skjeggtrimmer",
    productType: "Testprodukt",
    targets: options.targets,
    finishes: ["trim"],
    method: "electric",
    sensitivity: level === "neutral" ? { level } : { level, sourceId: "test" },
    referencePrice: { amount: options.price, checkedAt: "2026-09-24", sourceId: "test" },
    bestFor: "Test",
    features: [],
    reasons: { target: "test", finish: "test", sensitive: level === "neutral" ? undefined : "test" },
    specSourceIds: ["test"],
    primaryTargets: options.primary,
    primaryTargetsSourceId: options.primary.length ? "test" : undefined,
    sources: [{ id: "test", label: "Test", url: "https://example.com", retrievedAt: "2026-09-24", quote: "test" }],
    status: "active",
  };
}

const answers = (target: Target, sensitive: Answers["sensitive"] = "no"): Answers => ({ target, finish: "trim", sensitive, method: "unsure", budget: "mid" });

const specialist = trimmer("specialist", { targets: ["beard", "face"], primary: ["beard"], price: 650 });
const hybrid = trimmer("hybrid", { targets: ["face", "beard", "body"], primary: [], price: 430 });
const multi = trimmer("multi", { targets: ["face", "beard", "head", "body"], primary: [], price: 400 });
const order = (list: Product[], a: Answers) => rankProducts(a, list).map((item) => item.product.id);

test("spesialisering gir ingen ekstra poeng", () => {
  assert.equal(scoreProduct(specialist, answers("beard")), scoreProduct(hybrid, answers("beard")));
});

test("ved likt poeng vinner produktet som er laget for valgt område, selv om det er dyrere", () => {
  assert.deepEqual(order([hybrid, specialist, multi], answers("beard")), ["specialist", "multi", "hybrid"]);
});

test("spesialisering gjelder bare området produktet er laget for", () => {
  // I ansiktet er ingen av dem spesialister, så laveste pris avgjør som før.
  assert.deepEqual(order([hybrid, specialist, multi], answers("face")), ["multi", "hybrid", "specialist"]);
});

test("et reelt poengfortrinn slår spesialisering", () => {
  const gentleHybrid = trimmer("gentle-hybrid", { targets: ["face", "beard", "body"], primary: [], price: 430, sensitivity: "recommended" });
  assert.deepEqual(order([gentleHybrid, specialist, multi], answers("beard", "yes")), ["gentle-hybrid", "specialist", "multi"]);
});

test("alt-i-ett- og hybridprodukter får aldri spesialistfortrinnet", () => {
  for (const target of multi.targets) {
    assert.equal(isMadeFor(multi, answers(target)), false);
    assert.equal(isMadeFor(hybrid, answers(target)), false);
  }
});
