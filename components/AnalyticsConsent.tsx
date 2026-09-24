"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import {
  disableAnalytics,
  loadAnalytics,
  readConsent,
  trackPageView,
  writeConsent,
  type AnalyticsConsent as Consent,
} from "@/lib/analytics";

const OPEN_EVENT = "barbere:open-consent";
const CHANGE_EVENT = "barbere:consent-change";

function subscribeToConsent(onChange: () => void) {
  window.addEventListener(CHANGE_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(CHANGE_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

const noSubscription = () => () => {};

/**
 * Samtykkebanner og lasting av Google Analytics. Banneret vises til brukeren har valgt, og
 * kan åpnes igjen fra footer-lenken. Taggen lastes bare etter «Godta analyse».
 */
export function AnalyticsConsent() {
  // Serveren og hydreringen ser `null`, så banneret dukker først opp etter hydrering.
  const consent = useSyncExternalStore<Consent | null>(subscribeToConsent, readConsent, () => null);
  const hydrated = useSyncExternalStore(
    noSubscription,
    () => true,
    () => false,
  );
  const [reopened, setReopened] = useState(false);
  const pathname = usePathname();
  const trackedPath = useRef<string | null>(null);

  const open = reopened || (hydrated && consent === null);

  useEffect(() => {
    const openBanner = () => setReopened(true);
    window.addEventListener(OPEN_EVENT, openBanner);
    return () => window.removeEventListener(OPEN_EVENT, openBanner);
  }, []);

  // Én page_view per sidevisning: ved første last etter samtykke og ved hver Next-navigasjon.
  useEffect(() => {
    if (consent !== "accepted") return;
    loadAnalytics();
    if (trackedPath.current === pathname) return;
    trackedPath.current = pathname;
    trackPageView();
  }, [consent, pathname]);

  function choose(next: Consent) {
    if (next === "rejected" && consent === "accepted") disableAnalytics();
    writeConsent(next);
    setReopened(false);
    window.dispatchEvent(new Event(CHANGE_EVENT));
  }

  if (!open) return null;

  return (
    <div className="consent" role="region" aria-labelledby="consent-title">
      <p className="consent-text" id="consent-title">
        Vi bruker Google Analytics for å forstå hvordan Barbere.no brukes. Analyse aktiveres bare hvis du samtykker.{" "}
        <Link href="/personvern">Les om personvern</Link>
      </p>
      <div className="consent-actions">
        <button className="btn btn-primary" type="button" onClick={() => choose("accepted")}>
          Godta analyse
        </button>
        <button className="btn btn-ghost" type="button" onClick={() => choose("rejected")}>
          Avslå
        </button>
      </div>
    </div>
  );
}

/** Footer-lenke som åpner samtykkevalget på nytt. */
export function ConsentSettingsLink() {
  return (
    <button className="footer-consent" type="button" onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))}>
      Personvernvalg
    </button>
  );
}
