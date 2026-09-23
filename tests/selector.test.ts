import assert from "node:assert/strict";
import { test } from "node:test";
import { activeProducts } from "../data/products.ts";
import { explain, productMethod, selectProducts } from "../lib/selector.ts";
import { allCombinations, budgetCeiling, combinationKey } from "./helpers.ts";

const combinations = allCombinations();
const targetWord = { face: "ansikt", beard: "skjegg", head: "hode", body: "kropp" } as const;

test("velgeren har 192 kombinasjoner", () => {
  assert.equal(combinations.length, 192);
});

/*
 * Kontrollene er tilpasset ekte data: et krav gjelder bare når datasettet faktisk har et
 * produkt som kan oppfylle det.
 */
test("alle 192 kombinasjoner består kontrollene på de ekte produktene", () => {
  const failures: string[] = [];

  for (const answers of combinations) {
    const key = combinationKey(answers);
    const { best, alternatives } = selectProducts(answers);
    const topThree = [best, ...alternatives];
    const inArea = activeProducts.filter((product) => product.targets.includes(answers.target));
    const fits = inArea.filter((product) => product.finishes.includes(answers.finish));

    if (alternatives.length !== 2) failures.push(`${key}: ${alternatives.length} alternativer`);
    if (new Set(topThree.map((product) => product.id)).size !== 3) failures.push(`${key}: samme produkt flere ganger`);

    if (inArea.length >= 3 && topThree.some((product) => !product.targets.includes(answers.target))) {
      failures.push(`${key}: produkt utenfor valgt område`);
    }
    if (fits.length > 0 && !best.finishes.includes(answers.finish)) {
      failures.push(`${key}: hovedvalget gir ikke ønsket resultat (${best.id})`);
    }
    if (answers.method !== "unsure") {
      const methodAvailable = fits.some((product) => productMethod(product) === answers.method);
      if (methodAvailable && !topThree.some((product) => productMethod(product) === answers.method)) {
        failures.push(`${key}: ønsket metode mangler blant de tre`);
      }
    }
    const ceiling = budgetCeiling[answers.budget];
    const affordableAvailable = inArea.some((product) => product.referencePrice.amount <= ceiling);
    if (
      best.referencePrice.amount > ceiling &&
      affordableAvailable &&
      !alternatives.some((product) => product.referencePrice.amount <= ceiling)
    ) {
      failures.push(`${key}: over budsjett uten rimeligere alternativ`);
    }

    for (const product of topThree) {
      const rationale = explain(product, answers).toLowerCase();
      const missing: string[] = [];
      if (!rationale.includes(targetWord[answers.target])) missing.push("område");
      if (!rationale.includes(answers.finish === "smooth" ? "glatt" : "trim")) missing.push("resultat");
      if (answers.sensitive === "yes" && !rationale.includes("hud")) missing.push("sensitiv hud");
      if (!rationale.includes(productMethod(product) === "electric" ? "elektrisk" : "barberhøvel")) missing.push("metode");
      if (answers.budget !== "flex" && !rationale.includes("budsjett")) missing.push("budsjett");
      if (missing.length) failures.push(`${key}: ${product.id} mangler ${missing.join(", ")}`);
    }
  }

  assert.deepEqual(failures, []);
});

test("nøytral sensitivitet gir en nøktern begrunnelse, ikke en advarsel", () => {
  const neutral = activeProducts.find((product) => product.sensitivity.level === "neutral");
  assert.ok(neutral);
  const text = explain(neutral, { target: neutral.targets[0], finish: neutral.finishes[0], sensitive: "yes", method: "unsure", budget: "flex" });
  assert.match(text, /Ved sensitiv hud: produsenten oppgir ikke noe særskilt om sensitiv hud/);
});
