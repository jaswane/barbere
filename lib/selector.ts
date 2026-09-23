import type { Answers, Budget } from "../data/questions.ts";
import { products as allProducts, type Product, type ProductMethod } from "../data/products.ts";

export interface BudgetEvaluation {
  score: number;
  text: string;
}

export interface RankedProduct {
  product: Product;
  score: number;
}

export interface SelectorResult {
  best: Product;
  alternatives: Product[];
}

const answerLabels = {
  target: { face: "ansiktet", beard: "skjegget", head: "hodet", body: "kroppen" },
  finish: { smooth: "glatt resultat", trim: "trimming" },
  method: { electric: "elektrisk", razor: "barberhøvel", unsure: "åpen for begge metoder" },
} as const;

export function budgetEvaluation(product: Product, budget: Budget): BudgetEvaluation {
  if (budget === "low") {
    if (product.price <= 700) return { score: 16, text: "innenfor budsjettet ditt" };
    if (product.price <= 1000) return { score: 5, text: "litt over budsjettet ditt" };
    if (product.price <= 1500) return { score: -6, text: "over budsjettet ditt" };
    return { score: -18, text: "klart over budsjettet ditt" };
  }
  if (budget === "mid") {
    if (product.price <= 1500) return { score: 12, text: "innenfor budsjettområdet ditt" };
    if (product.price <= 2000) return { score: 2, text: "litt over budsjettområdet ditt" };
    return { score: -8, text: "over budsjettområdet ditt" };
  }
  if (budget === "high") {
    if (product.price > 1500) return { score: 8, text: "er innenfor det romslige budsjettet ditt" };
    return { score: 8, text: "ligger godt under maksbudsjettet ditt" };
  }
  return { score: 0, text: "" };
}

/** Produktets faktiske metode. Høvler er markert med «razor», alt annet er elektrisk. */
export function productMethod(product: Product): ProductMethod {
  return product.methods.includes("razor") ? "razor" : "electric";
}

export function scoreProduct(product: Product, answers: Answers): number {
  const targetMatch = product.targets.includes(answers.target);
  const finishMatch = product.finishes.includes(answers.finish);
  const methodMatch = answers.method === "unsure" || product.methods.includes(answers.method);
  const targetScore = targetMatch ? 60 : -45;
  const finishScore = finishMatch ? 40 : -28;
  const methodScore = answers.method === "unsure" ? 0 : methodMatch ? 14 : -6;
  const sensitiveScore = answers.sensitive === "yes" ? (product.sensitive ? 16 : -16) : 0;
  return targetScore + finishScore + methodScore + sensitiveScore + budgetEvaluation(product, answers.budget).score;
}

/**
 * Sorterer synkende på poeng, med laveste pris som tie-break. Når minst tre produkter
 * støtter valgt område, vises bare disse.
 */
export function rankProducts(answers: Answers, list: readonly Product[] = allProducts): RankedProduct[] {
  const ranked = list
    .map((product) => ({ product, score: scoreProduct(product, answers) }))
    .sort((a, b) => b.score - a.score || a.product.price - b.product.price);
  const correctArea = ranked.filter((item) => item.product.targets.includes(answers.target));
  return correctArea.length >= 3 ? correctArea : ranked;
}

/** Hovedvalg og nøyaktig to alternativer. */
export function selectProducts(answers: Answers, list: readonly Product[] = allProducts): SelectorResult {
  const ranked = rankProducts(answers, list);
  return { best: ranked[0].product, alternatives: ranked.slice(1, 3).map((item) => item.product) };
}

function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function explain(product: Product, answers: Answers): string {
  const parts: string[] = [];
  const targetMatch = product.targets.includes(answers.target);
  const finishMatch = product.finishes.includes(answers.finish);
  const actualMethod = productMethod(product);

  parts.push(
    targetMatch
      ? `For ${answerLabels.target[answers.target]}: ${product.reasons.target}`
      : `Ikke laget primært for ${answerLabels.target[answers.target]}`,
  );
  parts.push(
    finishMatch
      ? `For ${answerLabels.finish[answers.finish]}: ${product.reasons.finish}`
      : answers.finish === "smooth"
        ? "Trimmer i stedet for å barbere helt glatt"
        : "Barberer glattere enn ønsket trimming",
  );

  if (answers.sensitive === "yes") parts.push(`Ved sensitiv hud: ${product.reasons.sensitive}`);
  if (answers.method === "unsure") {
    parts.push(`${capitalize(answerLabels.method[actualMethod])} løsning når du er åpen for metode`);
  } else if (actualMethod === answers.method) {
    parts.push(`${capitalize(answerLabels.method[actualMethod])} som ønsket`);
  } else {
    parts.push(`${capitalize(answerLabels.method[actualMethod])}, ikke ${answerLabels.method[answers.method]} som du foretrakk`);
  }

  const budget = budgetEvaluation(product, answers.budget);
  if (budget.text) parts.push(capitalize(budget.text));
  return parts.join(" · ") + ".";
}
