import Link from "next/link";

const methodPoints = [
  { title: "Riktig bruksområde", text: "Ansikt, skjegg, hode eller kropp veier tyngst." },
  { title: "Hud og resultat", text: "Glatthet balanseres mot skånsom behandling." },
  { title: "Innenfor budsjett", text: "Du får alternativer i flere prisklasser." },
];

export function MethodSection() {
  return (
    <section className="method">
      <div className="wrap">
        <div className="method-panel">
          <div className="method-copy">
            <span className="eyebrow">Slik velger vi</span>
            <h2>Behov først. Produkt etterpå.</h2>
            <p>Resultatet styres av svarene dine og av egenskapene produsentene selv dokumenterer.</p>
            <Link className="method-link" href="/slik-velger-vi">
              Les hvordan velgeren vekter svarene <span aria-hidden="true">→</span>
            </Link>
            <figure className="method-image">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/barbere-detaljer.webp"
                width={1200}
                height={900}
                loading="lazy"
                alt="Nærbilde av elektrisk barberhode og sikkerhetshøvel"
              />
            </figure>
          </div>
          <div className="method-points">
            {methodPoints.map((point, index) => (
              <div className="method-point" key={point.title}>
                <b>{index + 1}</b>
                <div>
                  <strong>{point.title}</strong>
                  <span>{point.text}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
