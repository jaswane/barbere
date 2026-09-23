export function VisualBand() {
  return (
    <figure className="wrap visual-band">
      {/* Ferdig optimalisert bilde fra prototypen. object-fit og utsnitt styres i CSS. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/barbere-produktstill.webp"
        width={1600}
        height={666}
        loading="lazy"
        alt="Elektrisk barbermaskin, skjeggtrimmer og sikkerhetshøvel på mørk bakgrunn"
      />
    </figure>
  );
}
