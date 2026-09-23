import { ShaverSelector } from "./ShaverSelector";

const trustChips = ["Under ett minutt", "Ingen registrering", "Tydelig begrunnelse"];

export function HeroAndSelector() {
  return (
    <section className="hero" id="velger">
      <div className="wrap hero-grid">
        <div>
          <span className="eyebrow">Barberingsvelger</span>
          <h1>Finn riktig. Barber bedre.</h1>
          <p className="hero-lead">
            Fem raske spørsmål gir deg ett tydelig valg og to gode alternativer – tilpasset bruksområde, hud og budsjett.
          </p>
          <div className="trust-row" aria-label="Fordeler">
            {trustChips.map((chip) => (
              <span className="trust-chip" key={chip}>
                <span>✓</span> {chip}
              </span>
            ))}
          </div>
        </div>

        <ShaverSelector />
      </div>
    </section>
  );
}
