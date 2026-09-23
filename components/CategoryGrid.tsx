import { categoryCards } from "@/data/catalogue";
import { CategoryLink } from "./CatalogueFilter";

export function CategoryGrid() {
  return (
    <section id="kategorier">
      <div className="wrap">
        <div className="section-head">
          <div>
            <span className="eyebrow">Velg etter behov</span>
            <h2>Hva ser du etter?</h2>
          </div>
          <p>Gå rett til produkttypen du trenger, eller bruk velgeren hvis du er usikker.</p>
        </div>
        <div className="category-grid">
          {categoryCards.map((card) => (
            <CategoryLink filter={card.filter} key={card.filter}>
              <span className="category-index">{card.index}</span>
              <h3>{card.title}</h3>
              <span className="category-arrow" aria-hidden="true">→</span>
            </CategoryLink>
          ))}
        </div>
      </div>
    </section>
  );
}
