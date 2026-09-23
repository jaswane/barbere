"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { filterLabels, type FilterKey } from "@/data/catalogue";
import { productName } from "@/data/products";
import { filteredProducts, isFilterKey } from "@/lib/catalogue";
import type { OfferView } from "@/lib/offers";
import { registerModelContextTool } from "@/lib/webmcp";
import { StoreLink } from "./StoreLink";

interface CatalogueFilterState {
  filter: FilterKey;
  setFilter: (category: string, shouldScroll?: boolean) => FilterKey;
}

const CatalogueFilterContext = createContext<CatalogueFilterState | null>(null);

function useCatalogueFilter(): CatalogueFilterState {
  const value = useContext(CatalogueFilterContext);
  if (!value) throw new Error("CatalogueFilterProvider mangler");
  return value;
}

export function CatalogueFilterProvider({ children }: { children: ReactNode }) {
  const [filter, setFilterState] = useState<FilterKey>("alle");

  const setFilter = useCallback((category: string, shouldScroll = false) => {
    const next = isFilterKey(category) ? category : "alle";
    setFilterState(next);
    if (shouldScroll) document.getElementById("produkter")?.scrollIntoView({ behavior: "smooth" });
    return next;
  }, []);

  const value = useMemo(() => ({ filter, setFilter }), [filter, setFilter]);
  return <CatalogueFilterContext value={value}>{children}</CatalogueFilterContext>;
}

/** Kategorikort: ankeret ruller til katalogen, klikket setter filteret. */
export function CategoryLink({ filter, children }: { filter: FilterKey; children: ReactNode }) {
  const { setFilter } = useCatalogueFilter();
  return (
    <a className="category-card" href="#produkter" data-category-link={filter} onClick={() => setFilter(filter)}>
      {children}
    </a>
  );
}

export function ProductBrowser({ offers }: { offers: Record<string, OfferView> }) {
  const { filter, setFilter } = useCatalogueFilter();
  const visible = filteredProducts(filter);

  useEffect(
    () =>
      registerModelContextTool({
        name: "filter_shaving_products",
        title: "Filtrer barberingsprodukter",
        description: "Filtrer den synlige produktoversikten til én kategori.",
        inputSchema: {
          type: "object",
          properties: { category: { type: "string", enum: Object.keys(filterLabels) } },
          required: ["category"],
          additionalProperties: false,
        },
        annotations: { readOnlyHint: false, untrustedContentHint: false },
        execute(input) {
          const category = input?.category;
          if (!isFilterKey(category)) throw new Error("Ugyldig kategori");
          setFilter(category, true);
          return { category, products: filteredProducts(category).map((product) => productName(product)) };
        },
      }),
    [setFilter],
  );

  return (
    <>
      <div className="filters" id="filters" aria-label="Filtrer produkter">
        {(Object.entries(filterLabels) as Array<[FilterKey, string]>).map(([key, label]) => (
          <button
            key={key}
            type="button"
            className={`filter${filter === key ? " active" : ""}`}
            data-filter={key}
            aria-pressed={filter === key}
            onClick={() => setFilter(key)}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="product-grid" id="product-grid">
        {visible.map((product) => {
          const offer = offers[product.id];
          return (
            <article className="product-card" key={product.id}>
              <div className="product-visual" aria-hidden="true">
                <span className="product-visual-brand">{product.brand}</span>
                <span className="product-visual-model">{product.model}</span>
              </div>
              <div className="product-body">
                <span className="product-type">{product.productType}</span>
                <h3>{productName(product)}</h3>
                <p className="best-for">
                  <strong>Passer best for:</strong> {product.bestFor}
                </p>
                <div className="feature-list">
                  {product.features.map((feature) => (
                    <span className="feature" key={feature}>
                      {feature}
                    </span>
                  ))}
                </div>
                <div className="product-foot">
                  {offer?.priceText ? (
                    <div className="price-row">
                      <div>
                        <span className="price">{offer.priceText}</span>
                        <span className="price-label">{offer.checkedText}</span>
                      </div>
                    </div>
                  ) : null}
                  {offer ? <StoreLink offer={offer} /> : null}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </>
  );
}
