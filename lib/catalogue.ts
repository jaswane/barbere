import { filterLabels, type FilterKey } from "../data/catalogue.ts";
import { activeProducts, type Product } from "../data/products.ts";

export function isFilterKey(value: unknown): value is FilterKey {
  return typeof value === "string" && Object.hasOwn(filterLabels, value);
}

export function filteredProducts(category: FilterKey, list: readonly Product[] = activeProducts): readonly Product[] {
  if (category === "alle") return list;
  if (category === "sensitiv") return list.filter((product) => product.sensitivity.level === "recommended");
  return list.filter((product) => product.category === category);
}

const priceFormat = new Intl.NumberFormat("nb-NO");

export function formatPrice(value: number): string {
  return priceFormat.format(value) + " kr";
}
