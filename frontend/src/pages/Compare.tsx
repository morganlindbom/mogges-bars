// filename: src/pages/Compare.tsx

import { useEffect, useState } from "react";
import { Recipe } from "@/types/Recipe";

/**
 * Compare page.
 *
 * Allows selecting multiple recipes and comparing:
 * - price
 * - macros
 */
function Compare() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [ingredients, setIngredients] = useState<any[]>([]);
  const [selected, setSelected] = useState<string[]>([]);

  /**
   * Load data
   */
  useEffect(() => {
    async function load() {
      const r = await fetch("/api/recipes");
      const i = await fetch("/api/ingredients");

      setRecipes(await r.json());
      setIngredients(await i.json());
    }

    load();
  }, []);

  /**
   * Toggle selection
   */
  function toggle(id: string) {
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id]
    );
  }

  /**
   * Calculate price of recipe
   */
  function calculatePrice(recipe: Recipe) {
    return recipe.ingredients.reduce((sum, item) => {
      const ing = ingredients.find(
        (i) => i._id === item.ingredientId
      );

      if (!ing) return sum;

      return sum + (ing.pricePer1000g / 1000) * item.grams;
    }, 0);
  }

  const selectedRecipes = recipes.filter((r) =>
    selected.includes(r._id)
  );

  return (
    <div>
      <h1>Compare Recipes</h1>

      {/* SELECT */}
      <h3>Select recipes</h3>

      {recipes.map((r) => (
        <div key={r._id}>
          <label>
            <input
              type="checkbox"
              checked={selected.includes(r._id)}
              onChange={() => toggle(r._id)}
            />
            {r.name}
          </label>
        </div>
      ))}

      {/* RESULT */}
      <h3>Comparison</h3>

      {selectedRecipes.map((r) => (
        <div key={r._id} style={{ marginBottom: "10px" }}>
          <strong>{r.name}</strong>

          <p>Calories: {r.calories}</p>
          <p>Protein: {r.protein} g</p>
          <p>Carbs: {r.carbs} g</p>
          <p>Fat: {r.fat} g</p>

          <p>
            Price: {calculatePrice(r).toFixed(2)} kr
          </p>
        </div>
      ))}
    </div>
  );
}

export default Compare;