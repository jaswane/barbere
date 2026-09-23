import type { ProductCategory } from "./products.ts";

export type FilterKey = "alle" | ProductCategory | "sensitiv";

/** Rekkefølgen her er rekkefølgen på filterknappene. */
export const filterLabels: Record<FilterKey, string> = {
  alle: "Alle",
  barbermaskin: "Barbermaskiner",
  skjeggtrimmer: "Skjeggtrimmere",
  hode: "Hode",
  kropp: "Kropp",
  hovel: "Høvler",
  sensitiv: "Sensitiv hud",
};

export interface CategoryCard {
  filter: Exclude<FilterKey, "alle">;
  index: string;
  title: string;
}

export const categoryCards: readonly CategoryCard[] = [
  { filter: "barbermaskin", index: "01 / GLATT", title: "Barbermaskiner" },
  { filter: "skjeggtrimmer", index: "02 / FORM", title: "Skjeggtrimmere" },
  { filter: "hode", index: "03 / HODE", title: "Hodebarbering" },
  { filter: "kropp", index: "04 / KROPP", title: "Kroppsbarbering" },
  { filter: "hovel", index: "05 / MANUELL", title: "Barberhøvler" },
  { filter: "sensitiv", index: "06 / SKÅNSOM", title: "Sensitiv hud" },
];
