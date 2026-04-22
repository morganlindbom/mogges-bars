// filename: src/components/create-bar/IngredientsPanel/IngredientsPanel.tsx

import { useState } from "react";
import styles from "./IngredientsPanel.module.css";

/**
 * Ingredient type.
 */
type Ingredient = {
  _id: string;
  name: string;
};

/**
 * Props definition.
 */
type Props = {
  ingredients: Ingredient[];
  onAdd: (ingredient: Ingredient) => void;
};

function IngredientsPanel({ ingredients, onAdd }: Props) {
  /**
   * Local state for search input.
   */
  const [search, setSearch] = useState("");

  /**
   * Filters ingredients based on search input.
   *
   * Performs a case-insensitive match.
   */
  const filtered = ingredients.filter((ing) =>
    ing.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>

        {/* HEADER */}
        <div className={styles.header}>
          <h3 className={styles.title}>Ingredients</h3>

          <input
            className={styles.search}
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* GRID */}
        <div className={styles.grid}>
          {filtered.map((ing) => (
            <button
              key={ing._id}
              onClick={() => onAdd(ing)}
              className={styles.button}
            >
              {ing.name}
            </button>
          ))}

          {filtered.length === 0 && (
            <p className={styles.empty}>
              No ingredients found
            </p>
          )}
        </div>

      </div>
    </div>
  );
}

export default IngredientsPanel;