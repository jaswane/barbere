import type { Metadata } from "next";
import { InfoPage } from "@/components/InfoPage";

export const metadata: Metadata = {
  title: "Personvern",
  description: "Hvilke opplysninger Barbere.no behandler når du bruker siden, hva analysen med samtykke innebærer, og hva siden ikke samler inn.",
  alternates: { canonical: "/personvern" },
};

export default function PrivacyPage() {
  return (
    <InfoPage
      eyebrow="Sist endret 24. september 2026"
      title="Personvern"
      lead="Barbere.no bruker Google Analytics bare hvis du samtykker. Uten samtykke samler siden ikke inn opplysninger om deg utover det som skjer teknisk når den leveres til nettleseren din."
    >
      <section className="info-section">
        <h2>Analyse bare med samtykke</h2>
        <p>
          Barbere.no bruker Google Analytics 4 for å forstå hvor mye trafikk siden har og hvordan den brukes, for eksempel
          hvor mange som fullfører velgeren. Første gang du besøker siden, får du et spørsmål om du vil godta analyse.
        </p>
        <ul className="info-list">
          <li>Google-taggen lastes ikke før du har trykket «Godta analyse».</li>
          <li>Trykker du «Avslå», sendes ingen Analytics-data fra Barbere.no.</li>
          <li>Når analyse er godkjent, kan Google Analytics sette førstepartscookies i nettleseren din.</li>
          <li>Valget ditt lagres lokalt i nettleseren, slik at du slipper å svare på nytt ved hvert besøk.</li>
          <li>Du kan endre valget når som helst via «Personvernvalg» nederst på siden.</li>
          <li>Ingen Google Ads-konto er koblet til, og annonsesporing er slått av.</li>
        </ul>
        <p>
          Hvordan Google behandler data som samles inn gjennom Google Analytics, står i{" "}
          <a href="https://policies.google.com/privacy">Googles personvernerklæring</a>.
        </p>
      </section>

      <section className="info-section">
        <h2>Svarene i velgeren</h2>
        <p>
          Svarene du gir i produktvelgeren, behandles i nettleseren din. De sendes ikke til Barbere.no og lagres ikke. Laster
          du siden på nytt, er de borte.
        </p>
        <p>
          Har du godtatt analyse, registreres det som statistikk at velgeren ble startet og fullført, hvilke svar som ble
          valgt, og hvilket produkt som ble anbefalt. Det sendes ingen fritekst og ingenting som identifiserer deg.
        </p>
      </section>

      <section className="info-section">
        <h2>Butikklenker</h2>
        <p>
          Knappene «Se pris hos …» åpner butikkens side i en ny fane. Har du godtatt analyse, teller Barbere.no at knappen ble
          brukt, med produkt og butikk. Butikken behandler besøket etter sine egne personvernregler.
        </p>
      </section>

      <section className="info-section">
        <h2>Dette bruker vi ikke</h2>
        <ul className="info-list">
          <li>Annonsesporing, remarketing eller deling av data med annonsenettverk</li>
          <li>Innlogging, brukerkontoer eller skjemaer</li>
          <li>Andre analyseverktøy enn Google Analytics</li>
        </ul>
        <p>Skrifter og bilder lastes fra Barbere.no selv. Uten samtykke lastes ingenting fra Google.</p>
      </section>

      <section className="info-section">
        <h2>Hosting</h2>
        <p>
          Nettstedet hostes hos Vercel. For å levere og drifte siden kan Vercels hosting- og sikkerhetsinfrastruktur behandle
          tekniske opplysninger knyttet til forespørslene, som IP-adresse og hvilken side som ble åpnet. Mer om dette står i{" "}
          <a href="https://vercel.com/legal/privacy-policy">Vercels personvernerklæring</a>.
        </p>
      </section>

      <section className="info-section">
        <h2>Endringer</h2>
        <p>Tar Barbere.no i bruk annonselenker, blir denne siden oppdatert.</p>
      </section>

      <section className="info-section">
        <h2>Spørsmål</h2>
        <p>
          Spørsmål om personvern kan sendes til <a href="mailto:kontakt@swanecreative.no">kontakt@swanecreative.no</a>.
        </p>
      </section>
    </InfoPage>
  );
}
