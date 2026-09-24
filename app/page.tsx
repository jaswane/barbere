import type { Metadata } from "next";
import { CatalogueFilterProvider } from "@/components/CatalogueFilter";
import { CategoryGrid } from "@/components/CategoryGrid";
import { HeroAndSelector } from "@/components/HeroAndSelector";
import { MethodSection } from "@/components/MethodSection";
import { ProductCatalogue } from "@/components/ProductCatalogue";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { VisualBand } from "@/components/VisualBand";
import { activeProducts } from "@/data/products";
import { offerViewsByProduct } from "@/lib/offers";

// Siden bygges på nytt én gang i døgnet, slik at 60-dagersregelen for priser slår inn uten
// ny deploy. Prisene selv oppdateres bare når dataene endres.
export const revalidate = 86400;

// Canonical settes per side og ikke i layout, slik at 404-siden ikke arver forsidens canonical.
export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  const offers = offerViewsByProduct(
    activeProducts.map((product) => product.id),
    new Date(),
  );

  return (
    <>
      <SiteHeader />
      <main id="top">
        <HeroAndSelector offers={offers} />
        <VisualBand />
        <CatalogueFilterProvider>
          <CategoryGrid />
          <ProductCatalogue offers={offers} />
        </CatalogueFilterProvider>
        <MethodSection />
      </main>
      <SiteFooter />
    </>
  );
}
