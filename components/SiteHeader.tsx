import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="wrap nav">
        <Link className="brand" href="/#top" aria-label="Barbere.no, til forsiden">
          <span className="brand-mark">B/</span>Barbere.no
        </Link>
        <nav className="nav-links" aria-label="Hovedmeny">
          <Link className="nav-link" href="/#kategorier">Kategorier</Link>
          <Link className="nav-link" href="/#produkter">Demo-produkter</Link>
          <Link className="nav-cta" href="/#velger">Finn riktig valg</Link>
        </nav>
      </div>
    </header>
  );
}
