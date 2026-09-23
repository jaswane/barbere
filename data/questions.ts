export type Target = "face" | "beard" | "head" | "body";
export type Finish = "smooth" | "trim";
export type Sensitivity = "yes" | "no";
export type MethodPreference = "electric" | "razor" | "unsure";
export type Budget = "low" | "mid" | "high" | "flex";

export interface Answers {
  target: Target;
  finish: Finish;
  sensitive: Sensitivity;
  method: MethodPreference;
  budget: Budget;
}

export type QuestionKey = keyof Answers;

export interface Question<K extends QuestionKey = QuestionKey> {
  key: K;
  title: string;
  options: ReadonlyArray<{ value: Answers[K]; label: string }>;
}

type AnyQuestion = { [K in QuestionKey]: Question<K> }[QuestionKey];

export const questions: readonly AnyQuestion[] = [
  {
    key: "target",
    title: "Hva skal du barbere?",
    options: [
      { value: "face", label: "Ansikt" },
      { value: "beard", label: "Skjegg" },
      { value: "head", label: "Hode" },
      { value: "body", label: "Kropp" },
    ],
  },
  {
    key: "finish",
    title: "Hva slags resultat ønsker du?",
    options: [
      { value: "smooth", label: "Helt glatt" },
      { value: "trim", label: "Bare trimming" },
    ],
  },
  {
    key: "sensitive",
    title: "Har du sensitiv hud?",
    options: [
      { value: "yes", label: "Ja, ofte irritasjon" },
      { value: "no", label: "Nei / sjelden" },
    ],
  },
  {
    key: "method",
    title: "Hva foretrekker du?",
    options: [
      { value: "electric", label: "Elektrisk" },
      { value: "razor", label: "Barberhøvel" },
      { value: "unsure", label: "Usikker" },
    ],
  },
  {
    key: "budget",
    title: "Hva er omtrentlig budsjett?",
    options: [
      { value: "low", label: "Under 700 kr" },
      { value: "mid", label: "700–1 500 kr" },
      { value: "high", label: "Over 1 500 kr" },
      { value: "flex", label: "Fleksibelt" },
    ],
  },
];

export function optionValues<K extends QuestionKey>(key: K): Answers[K][] {
  const question = questions.find((item) => item.key === key) as Question<K> | undefined;
  return question ? question.options.map((option) => option.value) : [];
}
