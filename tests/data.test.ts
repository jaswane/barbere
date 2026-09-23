import assert from "node:assert/strict";
import { test } from "node:test";
import { offers } from "../data/offers.ts";
import { activeProducts, products } from "../data/products.ts";
import { stores } from "../data/stores.ts";
import { budgetEvaluation } from "../lib/selector.ts";

const isoDate = /^\d{4}-\d{2}-\d{2}$/;
const validDate = (value: string) => isoDate.test(value) && !Number.isNaN(Date.parse(value));

test("produkt-id-er og tilbuds-id-er er unike", () => {
  assert.equal(new Set(products.map((product) => product.id)).size, products.length);
  assert.equal(new Set(offers.map((offer) => offer.id)).size, offers.length);
});

test("hvert produkt har dokumenterte egenskaper", () => {
  const problems: string[] = [];
  for (const product of products) {
    const sourceIds = new Set(product.sources.map((source) => source.id));
    if (sourceIds.size !== product.sources.length) problems.push(`${product.id}: dupliserte kilde-id-er`);
    if (product.specSourceIds.length === 0) problems.push(`${product.id}: mangler kilde for område og resultat`);
    for (const id of product.specSourceIds) if (!sourceIds.has(id)) problems.push(`${product.id}: ukjent kilde ${id}`);
    if (product.targets.length === 0 || product.finishes.length === 0) problems.push(`${product.id}: mangler område eller resultat`);

    if (product.sensitivity.level !== "neutral") {
      const source = product.sources.find((item) => item.id === (product.sensitivity as { sourceId: string }).sourceId);
      if (!source?.quote) problems.push(`${product.id}: ${product.sensitivity.level} uten kilde med sitat`);
      if (!product.reasons.sensitive) problems.push(`${product.id}: ${product.sensitivity.level} uten begrunnelsestekst`);
    }
    if (!sourceIds.has(product.referencePrice.sourceId)) problems.push(`${product.id}: referansepris uten kilde`);
    if (!validDate(product.referencePrice.checkedAt)) problems.push(`${product.id}: ugyldig dato for referansepris`);
    for (const source of product.sources) {
      if (!validDate(source.retrievedAt)) problems.push(`${product.id}: ugyldig dato i kilde ${source.id}`);
      if (!source.url.startsWith("https://")) problems.push(`${product.id}: kilde uten https-adresse`);
    }
  }
  assert.deepEqual(problems, []);
});

test("tilbudene peker på eksisterende produkter og butikker, med gyldige datoer", () => {
  const ids = new Set(products.map((product) => product.id));
  const problems: string[] = [];
  for (const offer of offers) {
    if (!ids.has(offer.productId)) problems.push(`${offer.id}: ukjent produkt`);
    if (!stores[offer.storeId]) problems.push(`${offer.id}: ukjent butikk`);
    if (!validDate(offer.price.observedAt)) problems.push(`${offer.id}: ugyldig prisdato`);
    if (offer.price.campaignEndsAt && !validDate(offer.price.campaignEndsAt)) problems.push(`${offer.id}: ugyldig kampanjeslutt`);
    if (offer.availability && !validDate(offer.availability.observedAt)) problems.push(`${offer.id}: ugyldig lagerdato`);
    const host = new URL(offer.destinationUrl).hostname.replace(/^www\./, "");
    if (host !== stores[offer.storeId]?.domain) problems.push(`${offer.id}: lenken går ikke til ${stores[offer.storeId]?.domain}`);
    if (/[?&](utm_|aff|ref=|tt=|adt)/i.test(offer.destinationUrl)) problems.push(`${offer.id}: lenken ser ut til å ha sporing`);
  }
  assert.deepEqual(problems, []);
});

test("hvert aktive produkt har et aktivt tilbud", () => {
  const missing = activeProducts.filter((product) => !offers.some((offer) => offer.active && offer.productId === product.id));
  assert.deepEqual(missing.map((product) => product.id), []);
});

test("hvert område har minst tre aktive produkter", () => {
  for (const target of ["face", "beard", "head", "body"] as const) {
    const count = activeProducts.filter((product) => product.targets.includes(target)).length;
    assert.ok(count >= 3, `${target} har bare ${count} produkter`);
  }
});

test("tilbudsprisen havner i samme budsjettklasse som referanseprisen", () => {
  // Ellers kan begrunnelsen si «innenfor budsjettet» mens prisen på siden er over.
  const problems: string[] = [];
  for (const offer of offers.filter((item) => item.active)) {
    const product = products.find((item) => item.id === offer.productId);
    if (!product) continue;
    const atOfferPrice = { ...product, referencePrice: { ...product.referencePrice, amount: offer.price.amount } };
    for (const budget of ["low", "mid", "high", "flex"] as const) {
      if (budgetEvaluation(product, budget).text !== budgetEvaluation(atOfferPrice, budget).text) {
        problems.push(`${offer.id}: ${offer.price.amount} kr og referansepris ${product.referencePrice.amount} kr gir ulik budsjettvurdering (${budget})`);
      }
    }
  }
  assert.deepEqual(problems, []);
});
