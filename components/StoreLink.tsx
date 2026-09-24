import type { OfferView } from "@/lib/offers";
import { trackStoreClick, type StorePlacement } from "@/lib/analytics";

interface StoreLinkProps {
  offer: OfferView;
  productId: string;
  /** Hvor knappen står. Avgjør hvilken analysehendelse et klikk gir. */
  placement: StorePlacement;
  className?: string;
}

/** Vanlig lenke til butikkens produktside. Ingen affiliate. Klikket telles bare med samtykke. */
export function StoreLink({ offer, productId, placement, className = "btn btn-dark" }: StoreLinkProps) {
  return (
    <a
      className={className}
      href={offer.url}
      target="_blank"
      rel="noopener"
      onClick={() => trackStoreClick(placement, productId, offer.storeId)}
    >
      Se pris hos {offer.storeName} <span aria-hidden="true">↗</span>
      <span className="sr-only"> (åpnes i ny fane)</span>
    </a>
  );
}
