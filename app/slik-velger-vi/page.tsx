import type { Metadata } from "next";
import Link from "next/link";
import { InfoPage } from "@/components/InfoPage";

export const metadata: Metadata = {
  title: "Slik velger vi",
  description:
    "Hvordan Barbere.no bruker svarene om område, resultat, hud, metode og budsjett til å foreslå ett produkt og to alternativer.",
  alternates: { canonical: "/slik-velger-vi" },
};

const steps = [
  {
    title: "Hva skal du barbere?",
    text: "Ansikt, skjegg, hode eller kropp. Dette veier tyngst. Resultatet viser bare produkter som er laget for området du velger.",
  },
  {
    title: "Hva slags resultat ønsker du?",
    text: "Helt glatt eller bare trimming. Det nest viktigste svaret, fordi en trimmer ikke gir glatt hud og en barbermaskin ikke holder skjegget på en bestemt lengde.",
  },
  {
    title: "Har du sensitiv hud?",
    text: "Svarer du ja, får produkter som produsenten eller butikken beskriver som skånsomme, et fortrinn. Mangler en slik beskrivelse, teller det verken for eller mot. Et produkt trekkes bare ned hvis en kilde sier at det er lite egnet.",
  },
  {
    title: "Hva foretrekker du?",
    text: "Elektrisk, barberhøvel eller usikker. Metoden teller mindre enn område og resultat. Finnes det et produkt med metoden du ønsker som også passer området og resultatet, er det med blant de tre.",
  },
  {
    title: "Hva er omtrentlig budsjett?",
    text: "Produkter innenfor budsjettet får et fortrinn. Jo mer et produkt koster over budsjettet, desto lenger ned havner det. Velger du over 1 500 kr eller fleksibelt, er det behovet som avgjør, ikke prisen.",
  },
];

export default function MethodPage() {
  return (
    <InfoPage
      eyebrow="Slik velger vi"
      title="Slik fungerer velgeren"
      lead="Velgeren stiller fem spørsmål og sammenligner svarene med egenskapene til hvert produkt i utvalget. Du får ett hovedvalg og to alternativer, hvert med en begrunnelse bygget på svarene dine."
    >
      <section className="info-section">
        <h2>Fem spørsmål, i prioritert rekkefølge</h2>
        <ol className="info-steps">
          {steps.map((step, index) => (
            <li key={step.title}>
              <b>{index + 1}</b>
              <div>
                <strong>{step.title}</strong>
                <p>{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="info-section">
        <h2>Når prisen og behovet trekker hver sin vei</h2>
        <p>
          Et produkt som koster litt mer enn budsjettet, kan likevel bli hovedvalg hvis det passer behovet klart bedre enn de
          rimeligere. Da er minst ett av de to alternativene innenfor budsjettet, slik at du kan sammenligne.
        </p>
        <p>
          Passer to produkter like godt, vinner det som er laget spesielt for området du valgte. En skjeggtrimmer går da foran
          en trimmer for både ansikt og kropp når du skal trimme skjegget. Står de fortsatt likt, vinner det som vanligvis er
          rimeligst. Velgeren bruker den ordinære prisen, ikke dagens kampanjepris, så et midlertidig tilbud endrer ikke
          anbefalingen.
        </p>
      </section>

      <section className="info-section">
        <h2>Regler, ikke testresultater</h2>
        <p>
          Anbefalingen er regelbasert. De samme svarene gir alltid det samme resultatet, og vurderingen bygger på produktenes
          egenskaper og pris. Barbere.no skriver ikke at et produkt er testet med mindre det faktisk er det.
        </p>
        <p>
          Utvalget består foreløpig av elleve produkter, valgt slik at hvert område i velgeren har flere å velge mellom.
          Egenskapene er i hovedsak hentet fra produsentenes egne sider, mens pris og lenke kommer fra butikken.
        </p>
      </section>

      <section className="info-section">
        <h2>Prisene er sjekket for hånd</h2>
        <p>
          Prisen vises med datoen den ble sjekket, og den oppdateres ikke automatisk. Er den eldre enn 60 dager, viser vi den
          ikke, bare lenken til butikken.
        </p>
      </section>

      <section className="info-section" id="annonselenker">
        <h2>Om annonselenker</h2>
        <p>
          Barbere.no har ingen samarbeid med butikker eller merkevarer. Knappene «Se pris hos …» er vanlige lenker til
          butikkens produktside og gir ikke Barbere.no provisjon.
        </p>
        <p>
          Senere kan butikklenkene bli annonselenker. Det betyr at Barbere.no kan få provisjon hvis du kjøper noe etter å ha
          klikket, uten at det koster deg noe ekstra. Slike lenker skal merkes. Provisjon er ikke en del av rangeringen i
          velgeren.
        </p>
      </section>

      <p className="info-cta">
        <Link className="btn btn-dark" href="/#velger">
          Prøv velgeren
        </Link>
      </p>
    </InfoPage>
  );
}
