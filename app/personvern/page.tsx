import type { Metadata } from "next";
import { InfoPage } from "@/components/InfoPage";

export const metadata: Metadata = {
  title: "Personvern",
  description: "Hvilke opplysninger Barbere.no behandler når du bruker siden, og hva siden ikke samler inn.",
};

export default function PrivacyPage() {
  return (
    <InfoPage
      eyebrow="Sist endret 23. september 2026"
      title="Personvern"
      lead="Barbere.no samler ikke inn opplysninger om deg utover det som skjer teknisk når siden leveres til nettleseren din."
    >
      <section className="info-section">
        <h2>Dette bruker vi ikke</h2>
        <ul className="info-list">
          <li>Analyseverktøy som Google Analytics</li>
          <li>Annonsesporing eller sporing av klikk på butikklenker</li>
          <li>Informasjonskapsler (cookies)</li>
          <li>Innlogging, brukerkontoer eller skjemaer</li>
        </ul>
        <p>Skrifter og bilder lastes fra Barbere.no selv, ikke fra tredjeparter.</p>
      </section>

      <section className="info-section">
        <h2>Svarene i velgeren</h2>
        <p>
          Svarene du gir i produktvelgeren, behandles i nettleseren din. De sendes ikke til Barbere.no og lagres ikke. Laster
          du siden på nytt, er de borte.
        </p>
      </section>

      <section className="info-section">
        <h2>Butikklenker</h2>
        <p>
          Knappene «Se pris hos …» åpner butikkens side i en ny fane. Barbere.no registrerer ikke klikkene, men butikken
          behandler besøket etter sine egne personvernregler.
        </p>
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
        <p>
          Tar Barbere.no i bruk analyseverktøy eller annonselenker, blir denne siden oppdatert.
        </p>
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
