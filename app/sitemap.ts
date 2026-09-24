import type { MetadataRoute } from "next";

const SITE_URL = "https://barbere.no";

// Bare de indekserbare sidene. lastModified utelates med vilje: Vi har ingen pålitelig
// endringsdato per side, og en oppdiktet dato er verre enn ingen.
const paths = ["/", "/slik-velger-vi", "/om", "/personvern"];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.map((path) => ({ url: `${SITE_URL}${path}` }));
}
