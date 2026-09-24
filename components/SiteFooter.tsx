import Link from "next/link";
import { ConsentSettingsLink } from "./AnalyticsConsent";

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
            <ConsentSettingsLink />
          </nav>
          <p className="footer-credit">
            Et prosjekt fra <a href="https://swanecreative.no/">Swane Creative</a>
          </p>
        </div>
        <p>
          Barbere.no har ingen samarbeid med butikker eller merkevarer. Prisene er sjekket for hånd og oppdateres ikke
          automatisk.
        </p>
      </div>
    </footer>
  );
}
