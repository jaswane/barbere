import type { Metadata } from "next";
import Link from "next/link";
import { InfoPage } from "@/components/InfoPage";

export const metadata: Metadata = {
  title: { absolute: "Om Barbere.no" },
  description: "Hva Barbere.no er, hvordan siden velger produkter, og hvordan du kontakter oss.",
  alternates: { canonical: "/om" },
};

export default function AboutPage() {
  return (
    <InfoPage
      eyebrow="Bakgrunn"
      title="Om Barbere.no"
      lead="Barbere.no hjelper deg å velge barberingsprodukt ut fra hva du skal barbere, hvordan huden din reagerer og hvor mye du vil bruke."
    >
      <section className="info-section">
        <h2>Ett forslag i stedet for en lang liste</h2>
        <p>
          Velgeren stiller fem spørsmål og gir ett konkret forslag med to alternativer. Hvert forslag har en begrunnelse, så
          du kan se om den stemmer med det du svarte. <Link href="/slik-velger-vi">Slik fungerer velgeren</Link>.
        </p>
      </section>

      <section className="info-section">
        <h2>Behov først</h2>
        <p>
          Utgangspunktet er hva produktet skal brukes til. Hvilket område du skal barbere, om du vil ha glatt hud eller bare
          trimme, og om huden blir lett irritert, betyr mer enn merke og pris.
        </p>
      </section>

      <section className="info-section">
        <h2>Et lite utvalg foreløpig</h2>
        <p>
          Velgeren anbefaler foreløpig blant elleve produkter, og egenskapene er i hovedsak hentet fra produsentene.
          Barbere.no har ingen samarbeid med butikker eller merkevarer og har ikke testet produktene selv.
        </p>
      </section>

      <section className="info-section">
        <h2>Kontakt</h2>
        <p>
          Spørsmål, rettelser og tips kan sendes til{" "}
          <a href="mailto:kontakt@swanecreative.no">kontakt@swanecreative.no</a>.
        </p>
      </section>
    </InfoPage>
  );
}
