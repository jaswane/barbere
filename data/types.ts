import type { Finish, Target } from "./questions.ts";

export type ProductMethod = "electric" | "razor";
export type ProductCategory = "barbermaskin" | "skjeggtrimmer" | "hode" | "kropp" | "hovel";
export type SensitivityLevel = "recommended" | "neutral" | "avoid";

/** Kilde for en produktegenskap eller pris. `quote` er ordrett tekst fra kilden. */
export interface SourceRef {
  id: string;
  label: string;
  url: string;
  retrievedAt: string; // YYYY-MM-DD
  quote?: string;
}

/**
 * Stabile produktegenskaper. Butikk, aktuell pris og lenke ligger i `Offer`.
 * Alle egenskaper som påvirker velgeren, skal kunne spores til en kilde i `sources`.
 */
export interface Product {
  id: string;
  brand: string;
  model: string;
  category: ProductCategory;
  productType: string;
  targets: Target[];
  finishes: Finish[];
  method: ProductMethod;
  /** `neutral` betyr at vi mangler dokumentasjon, ikke at produktet er uegnet. */
  sensitivity: { level: "neutral" } | { level: "recommended" | "avoid"; sourceId: string };
  /** Ordinær observert pris. Brukes bare til poeng, budsjett og tie-break, aldri i visningen. */
  referencePrice: { amount: number; checkedAt: string; sourceId: string };
  bestFor: string;
  features: string[];
  /** Setningsdeler som brukes i begrunnelsen. `sensitive` trengs ikke ved `neutral`. */
  reasons: { target: string; finish: string; sensitive?: string };
  /** Kilder som dokumenterer bruksområder (`targets`) og resultat (`finishes`). */
  specSourceIds: string[];
  /**
   * Områdene produsenten tydelig har laget produktet for. Tomt for hybrid- og alt-i-ett-produkter.
   * Brukes bare til å skille produkter som ellers står helt likt i velgeren.
   */
  primaryTargets: Target[];
  /** Kilde med sitat som viser primærområdet. Påkrevd når `primaryTargets` ikke er tomt. */
  primaryTargetsSourceId?: string;
  sources: SourceRef[];
  /**
   * Lokalt produktbilde under `public/`. Filen er Icecats egen JPEG, uendret (ingen ny
   * komprimering, format eller beskjæring), slik Open Content License §1 krever for kopier.
   */
  image?: {
    src: string;
    /** Kort, konkret alt-tekst på norsk. */
    alt: string;
    width: number;
    height: number;
    source: "open-icecat";
    /** Icecats originale filadresse. Brukes ikke i visningen, bare til sporing. */
    sourceUrl: string;
    retrievedAt: string; // YYYY-MM-DD
  };
  status: "active" | "retired";
}

export type StoreId = "barbershop" | "proshop";

export interface Store {
  id: StoreId;
  name: string;
  domain: string;
}

/** Et tilbud hos én butikk. Samme produkt kan ha flere tilbud. Ingen affiliate-data i Phase 2C. */
export interface Offer {
  id: string;
  productId: string;
  storeId: StoreId;
  destinationUrl: string;
  price: {
    amount: number;
    type: "regular" | "campaign";
    observedAt: string; // YYYY-MM-DD
    /** Kreves for å vise en kampanjepris. Uten gyldig sluttdato vises ikke kampanjeprisen. */
    campaignEndsAt?: string;
  };
  /** Intern observasjon. Vises ikke i UI. */
  availability?: { status: "in_stock" | "backorder" | "out_of_stock" | "unknown"; observedAt: string; note?: string };
  active: boolean;
}
