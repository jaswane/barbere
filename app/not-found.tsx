import type { Metadata } from "next";
import Link from "next/link";
import { InfoPage } from "@/components/InfoPage";

export const metadata: Metadata = {
  title: "Fant ikke siden",
};

export default function NotFound() {
  return (
    <InfoPage
      eyebrow="404"
      title="Denne siden finnes ikke"
      lead="Lenken kan være feil, eller siden kan ha blitt flyttet."
    >
      <p className="info-cta">
        <Link className="btn btn-dark" href="/#velger">
          Gå til produktvelgeren
        </Link>
        <Link className="info-home-link" href="/">
          Til forsiden
        </Link>
      </p>
    </InfoPage>
  );
}
