import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { test } from "node:test";
import vm from "node:vm";
import { products } from "../data/products.ts";
import { questions, type Answers } from "../data/questions.ts";
import { explain, productMethod, rankProducts, selectProducts } from "../lib/selector.ts";

function allCombinations(): Answers[] {
  const combinations: Answers[] = [];
  const build = (index: number, answers: Partial<Answers>) => {
    if (index === questions.length) {
      combinations.push(answers as Answers);
      return;
    }
    const question = questions[index];
    for (const option of question.options) build(index + 1, { ...answers, [question.key]: option.value });
  };
  build(0, {});
  return combinations;
}

const combinations = allCombinations();
const targetWord = { face: "ansikt", beard: "skjegg", head: "hode", body: "kropp" } as const;

test("velgeren har 192 kombinasjoner", () => {
  assert.equal(combinations.length, 192);
});

test("alle 192 kombinasjoner består logikkontrollen", () => {
  const failures: string[] = [];

  for (const answers of combinations) {
    const key = JSON.stringify(answers);
    const { best, alternatives } = selectProducts(answers);
    const topThree = [best, ...alternatives];

    if (alternatives.length !== 2) failures.push(`${key}: ${alternatives.length} alternativer`);
    if (!best.targets.includes(answers.target)) failures.push(`${key}: feil område for ${best.name}`);
    if (!best.finishes.includes(answers.finish)) failures.push(`${key}: feil resultat for ${best.name}`);
    if (answers.sensitive === "yes" && !best.sensitive) failures.push(`${key}: uegnet for sensitiv hud (${best.name})`);
    if (topThree.some((product) => !product.targets.includes(answers.target))) failures.push(`${key}: alternativ med feil område`);

    const ceiling = answers.budget === "low" ? 700 : answers.budget === "mid" ? 1500 : Infinity;
    if (best.price > ceiling && !alternatives.some((product) => product.price <= ceiling)) {
      failures.push(`${key}: over budsjett uten rimeligere alternativ`);
    }

    if (answers.method !== "unsure") {
      const methodExists = products.some(
        (product) =>
          product.targets.includes(answers.target) &&
          product.finishes.includes(answers.finish) &&
          productMethod(product) === answers.method,
      );
      if (methodExists && !topThree.some((product) => productMethod(product) === answers.method)) {
        failures.push(`${key}: ønsket metode mangler blant de tre`);
      }
    }

    for (const product of topThree) {
      const rationale = explain(product, answers).toLowerCase();
      const missing: string[] = [];
      if (!rationale.includes(targetWord[answers.target])) missing.push("område");
      if (!rationale.includes(answers.finish === "smooth" ? "glatt" : "trim")) missing.push("resultat");
      if (answers.sensitive === "yes" && !rationale.includes("hud")) missing.push("sensitiv hud");
      if (!rationale.includes(productMethod(product) === "electric" ? "elektrisk" : "barberhøvel")) missing.push("metode");
      if (answers.budget !== "flex" && !rationale.includes("budsjett")) missing.push("budsjett");
      if (missing.length) failures.push(`${key}: ${product.name} mangler ${missing.join(", ")}`);
    }
  }

  assert.deepEqual(failures, []);
});

test("vinnerfordelingen er uendret fra prototypen", () => {
  const winners: Record<string, number> = {};
  for (const answers of combinations) {
    const { best } = selectProducts(answers);
    winners[best.name] = (winners[best.name] ?? 0) + 1;
  }
  assert.deepEqual(winners, {
    "Myk Hud Kit": 52,
    "Polar Edge Mini": 36,
    "Skarv T9": 24,
    "Roam Body B4": 20,
    "TryggBarber L1": 19,
    "Nordtrim S5": 12,
    "Allround A6": 12,
    "Kyst Head Flex": 12,
    "FjordCut R7": 3,
    "Boreal Head X": 2,
  });
});

const prototypePath = path.join(import.meta.dirname, "..", "_handoff", "prototype", "index.html");

test("rangering og begrunnelser er identiske med prototypen", { skip: !fs.existsSync(prototypePath) && "prototypen finnes ikke" }, () => {
  const html = fs.readFileSync(prototypePath, "utf8");
  const script = html.match(/<script>([\s\S]*?)<\/script>/)?.[1];
  assert.ok(script, "fant ikke script i prototypen");

  const stub = () => ({
    style: {}, dataset: {}, classList: { add() {}, remove() {}, contains: () => false },
    setAttribute() {}, appendChild() {}, addEventListener() {}, focus() {}, scrollIntoView() {},
    querySelectorAll: () => [], textContent: "", innerHTML: "", disabled: false,
  });
  const elements = new Map<string, ReturnType<typeof stub>>();
  const document = {
    getElementById(id: string) {
      if (!elements.has(id)) elements.set(id, stub());
      return elements.get(id);
    },
    querySelectorAll: () => [],
    createElement: stub,
  };
  const context = vm.createContext({ document, window: { clearTimeout() {}, setTimeout() {} }, Intl });
  vm.runInContext(`${script}\nglobalThis.__original = { rankProducts, explain, products, questions };`, context);
  const original = context.__original as {
    rankProducts: (answers: Answers) => Array<{ product: { name: string }; score: number }>;
    explain: (product: unknown, answers: Answers) => string;
    products: Array<{ id: string }>;
    questions: Array<{ key: string; title: string; options: Array<[string, string]> }>;
  };

  assert.deepEqual(
    questions.map((question) => ({ key: question.key, title: question.title, options: question.options.map((option) => [option.value, option.label]) })),
    JSON.parse(JSON.stringify(original.questions)),
    "spørsmålene avviker fra prototypen",
  );

  assert.deepEqual(
    JSON.parse(JSON.stringify(original.products)),
    JSON.parse(JSON.stringify(products)),
    "produktdata avviker fra prototypen",
  );

  for (const answers of combinations) {
    const expected = original.rankProducts(answers).map((item) => ({
      name: item.product.name,
      score: item.score,
      rationale: original.explain(item.product, answers),
    }));
    const actual = rankProducts(answers).map((item) => ({
      name: item.product.name,
      score: item.score,
      rationale: explain(item.product, answers),
    }));
    assert.deepEqual(actual, JSON.parse(JSON.stringify(expected)), JSON.stringify(answers));
  }
});
