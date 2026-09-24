import assert from "node:assert/strict";
import { afterEach, test } from "node:test";
import { CONSENT_STORAGE_KEY, readConsent, trackEvent, trackStoreClick } from "../lib/analytics.ts";

type Call = unknown[];

/** Et minimalt `window` med lagret samtykke og en gtag som bare noterer kallene. */
function fakeWindow(consent: string | null): Call[] {
  const calls: Call[] = [];
  const storage = new Map<string, string>();
  if (consent) storage.set(CONSENT_STORAGE_KEY, consent);
  (globalThis as { window?: unknown }).window = {
    localStorage: { getItem: (key: string) => storage.get(key) ?? null },
    gtag: (...args: unknown[]) => calls.push(args),
  };
  return calls;
}

afterEach(() => {
  delete (globalThis as { window?: unknown }).window;
});

test("uten window er hjelperne no-op og kaster ikke", () => {
  assert.equal(readConsent(), null);
  assert.doesNotThrow(() => trackEvent("selector_start", {}));
  assert.doesNotThrow(() => trackStoreClick("catalogue", "p1", "proshop"));
});

test("uten samtykke sendes ingenting, selv om gtag finnes", () => {
  for (const consent of [null, "rejected", "tull"]) {
    const calls = fakeWindow(consent);
    trackEvent("selector_restart", {});
    trackStoreClick("recommended", "p1", "proshop");
    assert.equal(calls.length, 0, `samtykke=${consent}`);
  }
});

test("med samtykke får hver plassering riktig hendelsesnavn og parametere", () => {
  const calls = fakeWindow("accepted");
  trackStoreClick("recommended", "braun-series-5", "proshop");
  trackStoreClick("alternative_1", "muhle-r89", "barbershop");
  trackStoreClick("alternative_2", "philips-qp2834", "proshop");
  trackStoreClick("catalogue", "remington-xr1600", "proshop");
  assert.deepEqual(calls, [
    ["event", "selector_result_click", { product_id: "braun-series-5", store: "proshop", placement: "recommended" }],
    ["event", "alternative_click", { product_id: "muhle-r89", store: "barbershop", placement: "alternative_1" }],
    ["event", "alternative_click", { product_id: "philips-qp2834", store: "proshop", placement: "alternative_2" }],
    ["event", "product_store_click", { product_id: "remington-xr1600", store: "proshop", placement: "catalogue" }],
  ]);
});
