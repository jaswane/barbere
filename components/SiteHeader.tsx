export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="wrap nav">
        <a className="brand" href="#top" aria-label="Barbere.no, til toppen">
          <span className="brand-mark">B/</span>Barbere.no
        </a>
        <nav className="nav-links" aria-label="Hovedmeny">
          <a className="nav-link" href="#kategorier">Kategorier</a>
          <a className="nav-link" href="#produkter">Demo-produkter</a>
          <a className="nav-cta" href="#velger">Finn riktig valg</a>
        </nav>
      </div>
    </header>
  );
}
