import { questions, type Answers } from "../data/questions.ts";

/** Alle 192 svarkombinasjoner, i fast rekkefølge. */
export function allCombinations(): Answers[] {
  const combinations: Answers[] = [];
  const build = (index: number, answers: Partial<Answers>) => {
    if (index === questions.length) {
      combinations.push(answers as Answers);
      return;
    }
    const question = questions[index];
    for (const option of question.options) build(index + 1, { ...answers, [question.key]: option.value });
  };
  build(0, {});
  return combinations;
}

export function combinationKey(answers: Answers): string {
  return [answers.target, answers.finish, answers.sensitive, answers.method, answers.budget].join("|");
}

export const budgetCeiling = { low: 700, mid: 1500, high: Infinity, flex: Infinity } as const;
