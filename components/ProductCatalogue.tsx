import Link from "next/link";
import { activeProducts } from "@/data/products";
import type { OfferView } from "@/lib/offers";
import { ProductBrowser } from "./CatalogueFilter";

/** Året i Icecat-notisen følger datoen bildene sist ble hentet. Uten bilder vises ingen notis. */
const imageYears = activeProducts.flatMap((product) => (product.image ? [Number(product.image.retrievedAt.slice(0, 4))] : []));
const imageCreditYear = imageYears.length > 0 ? Math.max(...imageYears) : null;

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
        {/* Open Content License §1: kreditt, notis og AS IS-forbehold på siden der bildene vises. */}
        {imageCreditYear ? (
          <p className="commercial-note image-credit">
            Produktbilder fra Philips via <a href="https://icecat.biz/">Open Icecat</a>, levert «AS IS» uten garanti for at
            de er korrekte eller oppdaterte. Database Right data-sheet {imageCreditYear} Icecat. All rights reserved.{" "}
            <Link href="/om#bildekilder">Om bildekildene</Link>
          </p>
        ) : null}
      </div>
    </section>
  );
}
