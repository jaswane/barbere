import { offers as allOffers } from "../data/offers.ts";
import { stores } from "../data/stores.ts";
import type { Offer } from "../data/types.ts";
import { formatPrice } from "./catalogue.ts";

/** Eldre priser vises ikke. Prisene oppdateres manuelt, aldri automatisk. */
export const PRICE_MAX_AGE_DAYS = 60;

/** Det UI-et trenger for å vise et tilbud. Lages på serveren og sendes til klientkomponentene. */
export interface OfferView {
  storeName: string;
  url: string;
  /** «ca. 940 kr» eller «Nå 719 kr». Mangler når prisen er for gammel. */
  priceText?: string;
  /** «Pris sjekket 23.09.2026 hos Proshop». Mangler sammen med `priceText`. */
  checkedText?: string;
}

const DAY_MS = 24 * 60 * 60 * 1000;

function isoDay(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export function daysSince(isoDate: string, today: Date): number {
  return Math.floor((Date.parse(isoDay(today)) - Date.parse(isoDate)) / DAY_MS);
}

/** 2026-09-23 → 23.09.2026 */
export function formatDate(isoDate: string): string {
  const [year, month, day] = isoDate.split("-");
  return `${day}.${month}.${year}`;
}

export function primaryOffer(productId: string, list: readonly Offer[] = allOffers): Offer | undefined {
  return list.find((offer) => offer.active && offer.productId === productId);
}

export function offerView(offer: Offer, today: Date): OfferView {
  const store = stores[offer.storeId];
  const view: OfferView = { storeName: store.name, url: offer.destinationUrl };
  if (daysSince(offer.price.observedAt, today) > PRICE_MAX_AGE_DAYS) return view;

  if (offer.price.type === "regular") {
    view.priceText = `ca. ${formatPrice(Math.round(offer.price.amount / 10) * 10)}`;
  } else if (offer.price.campaignEndsAt && offer.price.campaignEndsAt >= isoDay(today)) {
    view.priceText = `Nå ${formatPrice(offer.price.amount)}`;
  }
  if (view.priceText) view.checkedText = `Pris sjekket ${formatDate(offer.price.observedAt)} hos ${store.name}`;
  return view;
}

export function offerViewsByProduct(productIds: readonly string[], today: Date): Record<string, OfferView> {
  const views: Record<string, OfferView> = {};
  for (const id of productIds) {
    const offer = primaryOffer(id);
    if (offer) views[id] = offerView(offer, today);
  }
  return views;
}
