import Link from "next/link";

const footerLinks = [
  { href: "/slik-velger-vi", label: "Slik velger vi" },
  { href: "/om", label: "Om Barbere.no" },
  { href: "/personvern", label: "Personvern" },
];

export function SiteFooter() {
  return (
    <footer>
      <div className="wrap footer-grid">
        <div>
          <div className="footer-brand">Barbere.no</div>
          <nav className="footer-nav" aria-label="Om nettstedet">
            {footerLinks.map((link) => (
              <Link href={link.href} key={link.href}>
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <p>
          Interaktiv prototype med fiktive produkter og priser. Barbere.no har i denne demoen ingen oppgitte samarbeid med
          butikker eller merkevarer.
        </p>
      </div>
    </footer>
  );
}
