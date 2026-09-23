import assert from "node:assert/strict";
import { test } from "node:test";
import type { Offer } from "../data/types.ts";
import { formatDate, offerView } from "../lib/offers.ts";

const base: Offer = {
  id: "test@proshop",
  productId: "test",
  storeId: "proshop",
  destinationUrl: "https://www.proshop.no/test",
  price: { amount: 1386, type: "regular", observedAt: "2026-09-23" },
  active: true,
};

const at = (iso: string) => new Date(`${iso}T12:00:00Z`);

test("ordinær pris vises avrundet med dato og butikk", () => {
  const view = offerView(base, at("2026-09-23"));
  assert.equal(view.priceText?.replace(/\s/g, " "), "ca. 1 390 kr");
  assert.equal(view.checkedText, "Pris sjekket 23.09.2026 hos Proshop");
  assert.equal(view.storeName, "Proshop");
});

test("pris eldre enn 60 dager vises ikke, men lenken gjør", () => {
  assert.ok(offerView(base, at("2026-11-22")).priceText, "60 dager gammel pris skal fortsatt vises");
  const stale = offerView(base, at("2026-11-23"));
  assert.equal(stale.priceText, undefined);
  assert.equal(stale.checkedText, undefined);
  assert.equal(stale.url, base.destinationUrl);
});

test("kampanjepris vises bare med gyldig sluttdato", () => {
  const campaign: Offer = { ...base, price: { amount: 719, type: "campaign", observedAt: "2026-09-23", campaignEndsAt: "2026-09-30" } };
  assert.equal(offerView(campaign, at("2026-09-25")).priceText?.replace(/\s/g, " "), "Nå 719 kr");
  assert.equal(offerView(campaign, at("2026-10-01")).priceText, undefined);
  const noEnd: Offer = { ...base, price: { amount: 719, type: "campaign", observedAt: "2026-09-23" } };
  assert.equal(offerView(noEnd, at("2026-09-25")).priceText, undefined);
});

test("datoformat er DD.MM.YYYY", () => {
  assert.equal(formatDate("2026-09-03"), "03.09.2026");
});
