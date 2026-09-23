import Link from "next/link";
import type { OfferView } from "@/lib/offers";
import { ProductBrowser } from "./CatalogueFilter";

export function ProductCatalogue({ offers }: { offers: Record<string, OfferView> }) {
  return (
    <section className="catalogue" id="produkter">
      <div className="wrap">
        <div className="section-head">
          <div>
            <span className="eyebrow">Utvalget</span>
            <h2>Produkter som passer</h2>
          </div>
          <p>Elleve produkter som dekker de vanligste behovene. Prisene er sjekket for hånd og kan ha endret seg.</p>
        </div>
        <ProductBrowser offers={offers} />
        <p className="commercial-note">
          Butikklenkene er vanlige lenker og gir ikke Barbere.no provisjon.{" "}
          <Link href="/slik-velger-vi#annonselenker">Om annonselenker</Link>
        </p>
      </div>
    </section>
  );
}
