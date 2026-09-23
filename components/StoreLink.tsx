import type { OfferView } from "@/lib/offers";

/** Vanlig lenke til butikkens produktside. Ingen sporing eller affiliate i Phase 2C. */
export function StoreLink({ offer }: { offer: OfferView }) {
  return (
    <a className="btn btn-dark" href={offer.url} target="_blank" rel="noopener">
      Se pris hos {offer.storeName} <span aria-hidden="true">↗</span>
      <span className="sr-only"> (åpnes i ny fane)</span>
    </a>
  );
}
