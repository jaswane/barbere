import type { Metadata, Viewport } from "next";
import { DM_Sans, Manrope } from "next/font/google";
import type { CSSProperties } from "react";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

// next/font legger til en metrikkjustert Arial som reservefont. Prototypen faller tilbake
// til system-ui, og tegn som mangler i skriftene (som →) skal tegnes derfra. Derfor brukes
// bare selve familienavnet, og resten av stakken står i globals.css som i originalen.
function primaryFamily(font: { style: { fontFamily: string } }): string {
  return font.style.fontFamily.split(",")[0].trim();
}

const fontVariables = {
  "--font-dm-sans": primaryFamily(dmSans),
  "--font-manrope": primaryFamily(manrope),
} as CSSProperties;

export const metadata: Metadata = {
  metadataBase: new URL("https://barbere.no"),
  title: {
    default: "Barbere.no – finn riktig barberingsprodukt",
    template: "%s – Barbere.no",
  },
  description: "Svar på fem korte spørsmål og finn barberingsproduktet som passer behovet, huden og budsjettet ditt.",
};

export const viewport: Viewport = {
  themeColor: "#09283d",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="no" style={fontVariables}>
      <body>{children}</body>
    </html>
  );
}
