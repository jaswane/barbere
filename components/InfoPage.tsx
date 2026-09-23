import type { ReactNode } from "react";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

interface InfoPageProps {
  eyebrow: string;
  title: string;
  lead: ReactNode;
  children?: ReactNode;
}

/** Felles ramme for undersidene: samme header, wrap, typografi og footer som forsiden. */
export function InfoPage({ eyebrow, title, lead, children }: InfoPageProps) {
  return (
    <>
      <SiteHeader />
      <main id="top" className="info-page">
        <div className="wrap">
          <div className="info-head">
            <span className="eyebrow">{eyebrow}</span>
            <h1>{title}</h1>
            <p className="info-lead">{lead}</p>
          </div>
          {children ? <div className="info-body">{children}</div> : null}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
