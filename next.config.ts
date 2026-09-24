import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // MIDLERTIDIG før lansering: hele nettstedet skal ikke indekseres mens det bare finnes på
  // Vercel-adressen. Fjernes i domenesprinten, når barbere.no, canonical, robots og sitemap
  // aktiveres. Se docs/PRD.md, punkt 7.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
};

export default nextConfig;
