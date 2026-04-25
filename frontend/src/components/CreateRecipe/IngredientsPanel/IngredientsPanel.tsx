// filename: src/components/create-bar/IngredientsPanel/IngredientsPanel.tsx

import { useState } from "react";
import styles from "./IngredientsPanel.module.css";
import { Ingredient } from "@/types/Ingredient";

type Props = {
  ingredients: Ingredient[];
  onAdd: (ingredient: Ingredient) => void;
};

function IngredientsPanel({ ingredients = [], onAdd }: Props) {
/* Ingredients panel.

   Detailed explanation:
   - Uses ONLY Ingredient type
*/

  const [search, setSearch] = useState("");

  const filtered = ingredients.filter((ing) =>
    ing.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>

        <div className={styles.header}>
          <h3 className={styles.title}>Ingredients</h3>

          <input
            className={styles.search}
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

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
            <p className={styles.empty}>No ingredients found</p>
          )}
        </div>

      </div>
    </div>
  );
}

export default IngredientsPanel;