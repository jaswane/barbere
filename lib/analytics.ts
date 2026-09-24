/**
 * Google Analytics 4 med Basic Consent Mode. Taggen lastes bare etter at brukeren har
 * godtatt analyse, og alle hjelperne her er no-op uten samtykke. Ingen personopplysninger,
 * fritekst eller fulle butikk-URL-er sendes. Se docs/PRD.md, punkt 8.
 */

export const GA_MEASUREMENT_ID = "G-W0F35E3KC9";
export const CONSENT_STORAGE_KEY = "barbere_analytics_consent_v1";

export type AnalyticsConsent = "accepted" | "rejected";

/** Hendelsene fra PRD-en, med parameterne hver av dem får. */
export interface AnalyticsEvents {
  selector_start: Record<string, never>;
  selector_complete: {
    target: string;
    finish: string;
    sensitive: string;
    method: string;
    budget: string;
    recommended_product_id: string;
  };
  selector_restart: Record<string, never>;
  selector_result_click: { product_id: string; store: string; placement: "recommended" };
  alternative_click: { product_id: string; store: string; placement: "alternative_1" | "alternative_2" };
  product_store_click: { product_id: string; store: string; placement: "catalogue" };
}

export type StorePlacement =
  | AnalyticsEvents["selector_result_click"]["placement"]
  | AnalyticsEvents["alternative_click"]["placement"]
  | AnalyticsEvents["product_store_click"]["placement"];

type GtagFunction = (...args: unknown[]) => void;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: GtagFunction;
  }
}

function hasWindow(): boolean {
  return typeof window !== "undefined";
}

export function readConsent(): AnalyticsConsent | null {
  if (!hasWindow()) return null;
  try {
    const value = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    return value === "accepted" || value === "rejected" ? value : null;
  } catch {
    return null;
  }
}

export function writeConsent(consent: AnalyticsConsent): void {
  if (!hasWindow()) return;
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, consent);
  } catch {
    // Lagring kan være blokkert. Da spør vi igjen ved neste besøk.
  }
}

export function isAnalyticsGranted(): boolean {
  return readConsent() === "accepted";
}

function pushArguments(): void {
  window.dataLayer = window.dataLayer ?? [];
  // Samme form som Googles snutt: gtag.js leser bare `arguments`-objekter fra dataLayer.
  // eslint-disable-next-line prefer-rest-params
  window.dataLayer.push(arguments);
}
const gtag = pushArguments as GtagFunction;

function setOptOut(disabled: boolean): void {
  (window as unknown as Record<string, unknown>)[`ga-disable-${GA_MEASUREMENT_ID}`] = disabled;
}

/** Sender en hendelse hvis brukeren har godtatt analyse og taggen er satt opp. Ellers ingenting. */
export function trackEvent<Name extends keyof AnalyticsEvents>(name: Name, params: AnalyticsEvents[Name]): void {
  if (!hasWindow() || !isAnalyticsGranted() || typeof window.gtag !== "function") return;
  try {
    window.gtag("event", name, params);
  } catch {
    // Analyse skal aldri stoppe siden.
  }
}

/** Hendelsesnavnet for et klikk på en butikkknapp, ut fra hvor knappen står. */
export function trackStoreClick(placement: StorePlacement, productId: string, storeId: string): void {
  if (placement === "recommended") {
    trackEvent("selector_result_click", { product_id: productId, store: storeId, placement });
  } else if (placement === "catalogue") {
    trackEvent("product_store_click", { product_id: productId, store: storeId, placement });
  } else {
    trackEvent("alternative_click", { product_id: productId, store: storeId, placement });
  }
}

/** Én page_view per faktisk sidevisning. Taggen er satt opp med `send_page_view: false`. */
export function trackPageView(): void {
  if (!hasWindow() || !isAnalyticsGranted() || typeof window.gtag !== "function") return;
  try {
    window.gtag("event", "page_view", { page_location: window.location.href, page_title: document.title });
  } catch {
    // Se trackEvent.
  }
}

/**
 * Laster gtag.js og konfigurerer taggen. Kalles bare etter samtykke og gjør ingenting
 * andre gang. Consent-standarden settes før skriptet lastes, slik Basic Consent Mode krever.
 */
export function loadAnalytics(): void {
  if (!hasWindow()) return;
  setOptOut(false);
  if (document.getElementById("ga-gtag")) {
    // Allerede lastet, typisk etter avslag og nytt samtykke i samme økt.
    gtag("consent", "update", { analytics_storage: "granted" });
    return;
  }

  window.dataLayer = window.dataLayer ?? [];
  window.gtag = gtag;
  gtag("consent", "default", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "denied",
  });
  gtag("consent", "update", { analytics_storage: "granted" });
  gtag("js", new Date());
  gtag("config", GA_MEASUREMENT_ID, { send_page_view: false });

  const script = document.createElement("script");
  script.id = "ga-gtag";
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);
}

/**
 * Stopper analyse etter et avslag. Taggen kan ikke fjernes fra en side som allerede har
 * lastet den, så den slås av med Googles opt-out-flagg, samtykket trekkes tilbake, og
 * Analytics-cookiene fjernes for domenet.
 */
export function disableAnalytics(): void {
  if (!hasWindow()) return;
  setOptOut(true);
  if (typeof window.gtag === "function") {
    try {
      window.gtag("consent", "update", { analytics_storage: "denied" });
    } catch {
      // Ignoreres.
    }
  }
  clearAnalyticsCookies();
}

function clearAnalyticsCookies(): void {
  const names = document.cookie
    .split(";")
    .map((part) => part.trim().split("=")[0])
    .filter((name) => name === "_ga" || name.startsWith("_ga_") || name === "_gid");
  const host = window.location.hostname;
  const domains = [undefined, host, `.${host}`, `.${host.split(".").slice(-2).join(".")}`];
  for (const name of names) {
    for (const domain of domains) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${domain ? `; domain=${domain}` : ""}`;
    }
  }
}
