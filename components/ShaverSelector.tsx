"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { optionValues, questions, type Answers, type QuestionKey } from "@/data/questions";
import { formatPrice } from "@/lib/catalogue";
import { explain, selectProducts } from "@/lib/selector";
import { registerModelContextTool } from "@/lib/webmcp";
import { DemoLink } from "./DemoToast";

const answerKeys: QuestionKey[] = ["target", "finish", "sensitive", "method", "budget"];
const lastStep = questions.length - 1;

function isComplete(answers: Partial<Answers>): answers is Answers {
  return answerKeys.every((key) => answers[key] !== undefined);
}

export function ShaverSelector() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<Answers>>({});
  const [showResults, setShowResults] = useState(false);
  const nextButton = useRef<HTMLButtonElement>(null);

  const question = questions[step];
  const selectedValue = answers[question.key];
  const result = showResults && isComplete(answers) ? { answers, ...selectProducts(answers) } : null;

  function choose(value: string) {
    // Oppdateres synkront slik at Neste-knappen er aktiv før den får fokus, som i prototypen.
    flushSync(() => setAnswers((current) => ({ ...current, [question.key]: value })));
    nextButton.current?.focus();
  }

  function goNext() {
    if (!selectedValue) return;
    if (step < lastStep) setStep(step + 1);
    else setShowResults(true);
  }

  function restart() {
    setStep(0);
    setAnswers({});
    setShowResults(false);
  }

  useEffect(
    () =>
      registerModelContextTool({
        name: "configure_shaver_finder",
        title: "Finn barberingsprodukt",
        description: "Fyll ut hele Barbere.no-velgeren, oppdater den synlige siden og returner anbefalingen.",
        inputSchema: {
          type: "object",
          properties: Object.fromEntries(answerKeys.map((key) => [key, { type: "string", enum: optionValues(key) }])),
          required: answerKeys,
          additionalProperties: false,
        },
        annotations: { readOnlyHint: false, untrustedContentHint: false },
        execute(input) {
          for (const key of answerKeys) {
            if (!(optionValues(key) as unknown[]).includes(input?.[key])) throw new Error(`Ugyldig verdi for ${key}`);
          }
          const next = Object.fromEntries(answerKeys.map((key) => [key, input?.[key]])) as unknown as Answers;
          setAnswers(next);
          setStep(lastStep);
          setShowResults(true);
          document.getElementById("velger")?.scrollIntoView({ behavior: "smooth" });
          const { best, alternatives } = selectProducts(next);
          return { recommended: best.name, alternatives: alternatives.map((product) => product.name) };
        },
      }),
    [],
  );

  return (
    <div className="finder" aria-labelledby="finder-heading">
      <div className="finder-top">
        <div className="finder-title" id="finder-heading">Finn riktig barberingsprodukt</div>
        <div className="step-label" id="step-label">
          {result ? "Resultat" : `${step + 1} av ${questions.length}`}
        </div>
      </div>
      <div className="progress-track" aria-hidden="true">
        <div
          className="progress-fill"
          id="progress"
          style={{ width: result ? "100%" : `${((step + 1) / questions.length) * 100}%` }}
        />
      </div>
      <div className="finder-body">
        <div id="question-view" style={result ? { display: "none" } : undefined}>
          <div className="question-number" id="question-number">Spørsmål {step + 1}</div>
          <h2 className="question-title" id="question-title">{question.title}</h2>
          <div className="options" id="options" role="radiogroup" aria-labelledby="question-title">
            {question.options.map((option) => {
              const selected = selectedValue === option.value;
              return (
                <button
                  // Prototypen bygger knappene på nytt ved hvert valg, så valgt tilstand skifter uten overgang.
                  key={`${question.key}:${option.value}:${selectedValue ?? ""}`}
                  type="button"
                  className={`option${selected ? " selected" : ""}`}
                  role="radio"
                  aria-checked={selected}
                  onClick={() => choose(option.value)}
                >
                  <span>{option.label}</span>
                  <span className="option-indicator" aria-hidden="true">{selected ? "✓" : ""}</span>
                </button>
              );
            })}
          </div>
          <div className="finder-actions">
            <button
              className="btn btn-ghost"
              id="back-button"
              type="button"
              style={{ visibility: step === 0 ? "hidden" : "visible" }}
              onClick={() => step > 0 && setStep(step - 1)}
            >
              Tilbake
            </button>
            <button
              ref={nextButton}
              className="btn btn-primary"
              id="next-button"
              type="button"
              disabled={!selectedValue}
              onClick={goNext}
            >
              {step === lastStep ? "Se mitt resultat →" : "Neste →"}
            </button>
          </div>
        </div>

        <div className={`results${result ? " active" : ""}`} id="results" aria-live="polite">
          <div className="result-head">
            <div className="question-number">Ditt beste treff</div>
            <h2>Dette ville vi valgt</h2>
            <p id="result-summary">{result ? explain(result.best, result.answers) : null}</p>
          </div>
          <div id="winner">
            {result ? (
              <article className="winner-card">
                <div>
                  <span className="winner-badge">Anbefalt demo-valg</span>
                  <h3>{result.best.name}</h3>
                  <p>{result.best.best}</p>
                  <div className="winner-price">
                    ca. {formatPrice(result.best.price)} <span className="price-label">demo-pris</span>
                  </div>
                </div>
                <div className="result-actions">
                  <DemoLink product={result.best.name} />
                  <span className="ad-label">Demo – kommersiell lenke</span>
                </div>
              </article>
            ) : null}
          </div>
          <div className="alternatives" id="alternatives">
            {result?.alternatives.map((product, index) => (
              <div className="alt-card" key={product.id}>
                <div>
                  <strong>{product.name}</strong>
                  <span>
                    {explain(product, result.answers)} Ca. {formatPrice(product.price)}.
                  </span>
                </div>
                <span className="alt-score">#{index + 2}</span>
              </div>
            ))}
          </div>
          <div className="result-links">
            <button className="restart" id="restart" type="button" onClick={restart}>
              Start velgeren på nytt
            </button>
            <Link className="result-method-link" href="/slik-velger-vi">
              Slik velger vi
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
