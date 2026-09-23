import { CatalogueFilterProvider } from "@/components/CatalogueFilter";
import { CategoryGrid } from "@/components/CategoryGrid";
import { DemoToastProvider } from "@/components/DemoToast";
import { HeroAndSelector } from "@/components/HeroAndSelector";
import { MethodSection } from "@/components/MethodSection";
import { ProductCatalogue } from "@/components/ProductCatalogue";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { VisualBand } from "@/components/VisualBand";

export default function Home() {
  return (
    <DemoToastProvider>
      <SiteHeader />
      <main id="top">
        <HeroAndSelector />
        <VisualBand />
        <CatalogueFilterProvider>
          <CategoryGrid />
          <ProductCatalogue />
        </CatalogueFilterProvider>
        <MethodSection />
      </main>
      <SiteFooter />
    </DemoToastProvider>
  );
}
