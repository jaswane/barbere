"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";

const ShowToastContext = createContext<(message: string) => void>(() => {});

export function DemoToastProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState("Dette er en demo. Butikklenken kobles til senere.");
  const [visible, setVisible] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  const showToast = useCallback((text: string) => {
    setMessage(text);
    setVisible(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setVisible(false), 2600);
  }, []);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  return (
    <ShowToastContext value={showToast}>
      {children}
      <div className={`toast${visible ? " show" : ""}`} id="toast" role="status" aria-live="polite">
        {message}
      </div>
    </ShowToastContext>
  );
}

/** Demo-lenke til butikk. Navigerer ikke, men viser demo-beskjeden. */
export function DemoLink({ product }: { product: string }) {
  const showToast = useContext(ShowToastContext);
  return (
    <a
      className="btn btn-dark demo-link"
      href="#"
      data-product={product}
      onClick={(event) => {
        event.preventDefault();
        showToast(`Demo: butikklenken for ${product} kobles til senere.`);
      }}
    >
      Se hos butikk <span aria-hidden="true">↗</span>
    </a>
  );
}
