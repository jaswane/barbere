# Barbere.no – PRD

Sist oppdatert: 24.09.2026

Dette dokumentet beskriver Barbere.no slik siden faktisk er bygget, og hva som er bevisst utsatt. Det er ikke en ønskeliste. Punkter merket «STATUS» sier hva som gjelder nå.

## 1. Formål

**Problem:** Det er vanskelig å velge barberingsprodukt. Utvalget er stort, produktene ligner hverandre på papiret, og mange oversikter er lange lister uten begrunnelse.

**Hva Barbere.no gjør:** Brukeren svarer på fem spørsmål og får ett konkret forslag og to alternativer, med en begrunnelse som bygger på svarene.

**Målgruppe:** Norske brukere, i første versjon primært menn gjennom produktutvalg og språk. Uttrykket skal ikke være macho eller stereotypt. Det er ingen kjønnsvelger.

**Primær handling:** Produktvelgeren på forsiden (`/#velger`). Alt annet på siden støtter den.

## 2. Produkt

**Fem spørsmål** (`data/questions.ts`): område (ansikt, skjegg, hode, kropp), resultat (helt glatt, bare trimming), sensitiv hud (ja, nei), metode (elektrisk, barberhøvel, usikker) og budsjett (under 700 kr, 700–1 500 kr, over 1 500 kr, fleksibelt). Totalt 192 kombinasjoner.

**Resultat:** Ett hovedvalg og nøyaktig to alternativer. Hvert har en begrunnelse bygget av produktets dokumenterte egenskaper og brukerens svar.

**Behov først:** Område veier tyngst (+60/−45), deretter resultat (+40/−28), metode (+14/−6), sensitiv hud (se under) og budsjett. Resultatet viser bare produkter for valgt område når datasettet har minst tre slike.

**Sensitiv hud:** `recommended` (+16), `neutral` (0) eller `avoid` (−16), og bare når brukeren har svart ja. `neutral` betyr at dokumentasjon mangler, ikke at produktet er uegnet.

**Rekkefølge ved likt poeng:** først produkt som er laget spesielt for valgt område (`primaryTargets`), deretter lavest referansepris, til slutt id.

**Ekte produkter:** 11 produkter, verifisert 23.–24.09.2026.

| Produkt | Butikk |
|---|---|
| Braun Series 5 52-B1000s | Proshop |
| Philips Shaver Series 7000 S7882/55 | Proshop |
| Mühle R89 | Barbershop |
| Philips Beard Trimmer 5000 BT5780/15 | Proshop |
| Philips OneBlade 360 Face + Body QP2834/23 | Proshop |
| Remington RX7 Ultimate Series XR1600 | Proshop |
| Remington RX5 Ultimate Series XR1500 | Proshop |
| Remington T-Series Hair and Beard Kit MB7050 | Proshop |
| Philips All-in-One Trimmer Series 7000 MG7940/15 | Proshop |
| Philips Body Groomer Series 7000 BG7470/15 | Proshop |
| Mühle Companion | Barbershop |

## 3. Sider og ruter

| Rute | Innhold |
|---|---|
| `/` | Hero, produktvelger, bildebånd, kategorikort (filtre), produktkatalog, metodepanel |
| `/slik-velger-vi` | Hvordan velgeren vekter svarene, priser og `#annonselenker` |
| `/om` | Hva siden er, kontaktadresse |
| `/personvern` | Dagens faktiske behandling av opplysninger |
| 404 | Norsk side i samme design, `noindex` |

Det finnes **ingen kategorisider** og **ingen produktdetaljsider** ennå. Kategorikortene på forsiden filtrerer katalogen.

## 4. Data

**Filer:** `data/products.ts`, `data/offers.ts`, `data/stores.ts`, typer i `data/types.ts`.

**Product** beskriver stabile egenskaper: merke, modell, kategori, `targets`, `finishes`, `method`, `sensitivity`, `primaryTargets`, `referencePrice`, tekster og kilder. Egenskaper som påvirker velgeren, skal ha en kilde i `sources`. Påstander om sensitiv hud og primærområde krever ordrett sitat.

**Offer** beskriver et tilbud hos én butikk: vanlig produktside (`destinationUrl`), observert pris, pristype (`regular` / `campaign`), `observedAt` og en intern lagerobservasjon. Samme produkt kan få flere tilbud.

**Store** har bare id, navn og domene. Affiliatenettverk er ikke en egenskap ved butikken.

**Pris:**
- `referencePrice` (ordinær observert pris) brukes bare til poeng, budsjett og tie-break.
- Tilbudsprisen vises i UI som «ca. X kr» med «Pris sjekket DD.MM.YYYY hos …».
- Kampanjepris («Nå X kr») vises bare med gyldig sluttdato.
- **60-dagersregelen:** Er prisen eldre enn 60 dager, vises den ikke, bare lenken. Forsiden bygges på nytt daglig slik at regelen slår inn uten deploy. Prisene oppdateres ikke automatisk.
- En datatest krever at tilbudsprisen gir samme budsjettvurdering som referanseprisen.

**Lager:** Ingen lagerstatus vises i UI. `availability` er bare en intern observasjon.

**Tester:** 29 tester, blant dem kontroll av alle 192 kombinasjoner, datavalidering, sensitivitet, spesialisering, prisregler, determinisme og et gjennomgått snapshot av alle 192 resultater (`tests/__snapshots__/selector-192.json`).

## 5. Affiliate

**STATUS: IKKE AKTIVERT.** Ingen avtaler er godkjent. Butikkknappene er vanlige lenker med `target="_blank" rel="noopener"` og gir ikke provisjon. `/slik-velger-vi#annonselenker` sier dette.

**Planlagt (Phase 2D):**
- Barbershop og Proshop, med én valgt affiliatevei per butikk. Begge finnes i flere nettverk (Barbershop: TradeTracker og Adtraction; Proshop: Partner-Ads og Adtraction), så valget tas etter at vilkårene er sjekket.
- `/go/[offerId]` med 307-redirect og `X-Robots-Tag: noindex, nofollow`.
- `rel="sponsored nofollow"` på butikklenker.
- Tydelig merking, med lenke til `#annonselenker`.
- Et `affiliate_click`-event når analyse er på plass.
- Personvernsiden oppdateres før aktivering. Den beskriver i dag analyse med samtykke, ikke annonselenker.

## 6. Bilder

**STATUS: DELVIS (Phase 2E.2, 24.09.2026).** Fem Philips-produkter har bilde fra Open Icecat. Seks produkter (Braun Series 5, Mühle R89, Mühle Companion, Remington XR1600, XR1500 og MB7050) viser fortsatt merke og modell i plassholderen, til bruksretten er avklart gjennom affiliate-feed eller skriftlig tillatelse.

**Kilde og lisens:** Philips er Open Icecat-sponsor. Bildene brukes under Open Content License v1.4 (11.02.2026), etter den konservative løsningen fra Phase 2E.1B:
- Filene er Icecats egne Pic500x500-JPEG-er (500 × 500, 70–82 KB), lastet ned uendret til `public/images/products/`. Ingen ny komprimering, WebP/AVIF eller beskjæring. Icecats filnavn er SHA-1 av innholdet, så identiteten kan kontrolleres mot `sourceUrl` i `data/products.ts`.
- Ingen hotlinking. Icecat sier selv at bildelenkene ikke er stabile.
- Rendering med `next/image` og `unoptimized`, slik at Next ikke re-koder. CSS viser hele bildet med `object-fit: contain` i dagens 16:9-ramme på hvit bakgrunn.
- Hvert bilde har `src`, `alt`, mål, `source`, `sourceUrl` og `retrievedAt`. En datatest kontrollerer at filen finnes og at kilden er Icecat.

**Kreditt og forbehold (krav i lisensens §1):**
- Forsiden, der bildene vises, har en linje under katalogen: «Produktbilder fra Philips via Open Icecat, levert «AS IS» uten garanti for at de er korrekte eller oppdaterte. Database Right data-sheet [år] Icecat. All rights reserved.» «Open Icecat» lenker til icecat.biz. Året følger `retrievedAt`.
- `/om#bildekilder` forklarer kilden, lenker til Open Content License, gjentar AS IS-forbeholdet og sier at bilder kan bli byttet ut eller fjernet hvis rettighetsgrunnlaget endres.
- Philips-kreditt er ikke et lisenskrav, men bildene omtales som «fra Philips via Open Icecat».

**Vedlikehold:** Hent bildene på nytt fra Icecat ved den månedlige gjennomgangen (lisensens §4). Trekker Philips eller Icecat tilbake bildene, fjernes `image`-feltet og filen, og kortet faller tilbake til plassholderen.

**Gjenstår:** Resultatkortet i velgeren viser ikke bilde. De seks andre produktene venter på affiliate-feed eller annen rettighetskilde.

## 7. SEO og domene

**STATUS: FERDIG (domenesprint 24.09.2026).**

- **Domene og HTTPS:** `https://barbere.no` er primærdomenet, hostet hos Vercel. `http://` redirecter med 308 til `https://`.
- **www:** `https://www.barbere.no` redirecter til apex i ett steg, uten loop. Redirecten er satt opp i Vercel og bruker i dag 307. 308 (permanent) er å foretrekke og endres under Domains i Vercel.
- **Google Search Console:** Eiendommen er koblet. Sitemap sendes inn manuelt: `https://barbere.no/sitemap.xml`.
- **`metadataBase`:** `https://barbere.no`, satt i `app/layout.tsx`.
- **Canonical:** Hver indekserbar side setter sin egen canonical på apex (`/`, `/slik-velger-vi`, `/om`, `/personvern`). Canonical settes per side og ikke i layout, slik at 404 ikke arver forsidens canonical.
- **`app/robots.ts`:** Tillater alt for vanlige crawlere og peker til sitemapen. `/go/` blokkeres ikke i robots, fordi en blokkert side ikke kan lese `noindex`. Open Icecat Fair Use Policy (02.05.2026) ber om at robots.txt utestenger crawlere som samler innhold til blant annet AI-trening. Derfor har seks tokens `Disallow: /`: GPTBot, ClaudeBot, Google-Extended, Applebot-Extended, CCBot og meta-externalagent. Alle er dokumentert av operatørene som styring av treningsbruk, og ingen påvirker Google Søk, Siri eller ChatGPT-søk. Policyen nevner også «analytics» og «content aggregation», men navngir ingen crawlere, så det er ikke implementert.
- **`app/sitemap.ts`:** De fire sidene over, som absolutte apex-URL-er. `lastModified` er utelatt fordi vi ikke har en pålitelig dato per side.
- **Midlertidig noindex er fjernet** fra `next.config.ts`. 404 har fortsatt `noindex`, og det setter Next.js selv.

**Gjenstår:**
- apple-icon og Open Graph-bilde (se launch gates). Metadata bruker ingen gamle hoster.
- `/go/` skal ikke ligge i sitemapen og skal ha `noindex` når affiliate aktiveres (punkt 5).

DNS ligger hos Domeneshop: A-record til Vercel for apex og CNAME for `www`. De gamle A/AAAA-recordene er fjernet.

## 8. Analytics

**STATUS: GA4 FERDIG. Samtykke FERDIG (Basic Consent Mode).** Måle-ID `G-W0F35E3KC9`, satt i `lib/analytics.ts`.

**Samtykke:** `components/AnalyticsConsent.tsx` viser et norsk banner til brukeren har valgt. Valget (`accepted` / `rejected`) lagres i `localStorage` under `barbere_analytics_consent_v1`. Footer-lenken «Personvernvalg» åpner banneret igjen. Ingen ekstern CMP og ingen Google Tag Manager.

- gtag.js lastes først når brukeren godtar. Uten samtykke går ingen forespørsler til Google.
- Consent-standard: alt `denied`. Ved samtykke oppdateres bare `analytics_storage` til `granted`. Google Ads brukes ikke.
- Bytter brukeren fra godtatt til avslått, settes `ga-disable`-flagget, samtykket trekkes tilbake, og `_ga`-cookiene fjernes.
- Ingen cookieless pings (Advanced Consent Mode).

**Page views:** Taggen konfigureres med `send_page_view: false`. Én `page_view` sendes per faktisk sidevisning fra `AnalyticsConsent`, som følger `usePathname()`. Hvis «Sideendringer basert på nettleserhistorikk» er slått på under Utvidet måling i GA4, må den slås av, ellers telles Next-navigasjoner dobbelt.

**Events** (`trackEvent` i `lib/analytics.ts`, no-op uten samtykke):

| Event | Når | Parametere |
|---|---|---|
| `selector_start` | Første svar i en ny velgerrunde | – |
| `selector_complete` | Resultatet vises | `target`, `finish`, `sensitive`, `method`, `budget`, `recommended_product_id` |
| `selector_restart` | «Start velgeren på nytt» | – |
| `selector_result_click` | Butikkknapp på hovedvalget | `product_id`, `store`, `placement: recommended` |
| `alternative_click` | Butikklenke på et alternativ | `product_id`, `store`, `placement: alternative_1` / `alternative_2` |
| `product_store_click` | Butikkknapp i katalogen | `product_id`, `store`, `placement: catalogue` |

Ingen personopplysninger, fritekst eller fulle butikk-URL-er sendes.

**`affiliate_click`: DEFERRED** til affiliate aktiveres (punkt 5).

## 9. Juridisk og tillit

- `/om`, `/personvern` og `/slik-velger-vi` finnes.
- Kontaktadresse (`kontakt@swanecreative.no`) står bare på `/om` og `/personvern`.
- Footer: «Et prosjekt fra Swane Creative» med lenke til https://swanecreative.no/.
- **Formell juridisk avsender** (selskapsnavn, org.nr., adresse) er ikke fastsatt og må være på plass før full lansering.
- Priser og tilgjengelighet kan endres. Siden sier at prisene er sjekket for hånd, og lenker til butikken for gjeldende pris.
- Siden påstår ikke at produktene er testet.

## 10. Vedlikehold

Forslag til rutine:
- **Månedlig:** kontroller alle produktlenker, priser og utgåtte modeller. Oppdater `observedAt`, og `referencePrice` ved varige prisendringer. Kjør testene.
- **Månedlig etter affiliate:** kontroller at affiliatelenkene virker og at programmene fortsatt er aktive.
- **Kvartalsvis:** gå gjennom produktsettet og selector-resultatene (snapshot-diff og menneskelige scenarier).
- **Senere:** bruk GSC og GA4 til å prioritere nye produkter og sider.

## 11. Launch gates

| Gate | Status |
|---|---|
| Selector kvalitetssikret | Ferdig (Phase 2C.5) |
| Produktbilder eller godkjent plassholder-strategi | Delvis: 5 Philips-bilder fra Open Icecat, 6 plassholdere |
| Affiliate aktivert, eller eksplisitt beslutning om lansering uten | Mangler beslutning |
| Juridisk avsender ferdig | Mangler |
| `metadataBase`, canonical, sitemap, robots | Ferdig (domenesprint) |
| Midlertidig noindex fjernet | Ferdig (domenesprint) |
| Google Search Console | Ferdig: koblet, sitemap sendes inn manuelt |
| Analyse og samtykke | Ferdig: GA4 med Basic Consent Mode |
| Favicon, apple-icon og Open Graph kontrollert | Delvis: favicon finnes, apple-icon og OG mangler |
| Mobil-QA på ekte enheter | Mangler |
| build, lint, typecheck og test grønt | Ferdig |
| Domene og HTTPS | Ferdig. www bruker 307, bør endres til 308 i Vercel |
