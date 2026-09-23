import { ProductBrowser } from "./CatalogueFilter";

export function ProductCatalogue() {
  return (
    <section className="catalogue" id="produkter">
      <div className="wrap">
        <div className="section-head">
          <div>
            <span className="eyebrow">Eksempelutvalg</span>
            <h2>Produkter som passer</h2>
          </div>
          <p>Alle navn, priser og butikklenker er demo-innhold i denne prototypen.</p>
        </div>
        <ProductBrowser />
        <p className="commercial-note">
          Demo – fremtidige butikklenker kan være annonselenker som gir Barbere.no provisjon, uten ekstra kostnad for deg.
        </p>
      </div>
    </section>
  );
}
