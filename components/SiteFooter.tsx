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
          Barbere.no har ingen samarbeid med butikker eller merkevarer. Prisene er sjekket for hånd og oppdateres ikke
          automatisk.
        </p>
      </div>
    </footer>
  );
}
