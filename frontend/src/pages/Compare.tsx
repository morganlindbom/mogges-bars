// filename: src/pages/Compare.tsx

import { useEffect, useState } from "react";
import { Recipe } from "@/types/Recipe";
import { getRecipes } from "@/services/recipe.api";
import { getIngredients } from "@/services/ingredient.api";
import shell from "./PageShell.module.css";

type Ingredient = {
  _id: string;
  pricePer1000g: number;
};

/**
 * Compare page.
 *
 * Allows selecting multiple recipes and comparing:
 * - price
 * - macros
 */
function Compare() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const [recipeData, ingredientData] = await Promise.all([
          getRecipes<Recipe[]>(),
          getIngredients<Ingredient[]>(),
        ]);

        setRecipes(recipeData);
        setIngredients(ingredientData);
        setError(null);
      } catch {
        setError("Failed to load comparison data.");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  function toggle(id: string) {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  }

  function calculatePrice(recipe: Recipe) {
    return recipe.ingredients.reduce((sum, item) => {
      const ing = ingredients.find((i) => i._id === item.ingredientId);

      if (!ing) return sum;

      return sum + (ing.pricePer1000g / 1000) * item.grams;
    }, 0);
  }

  const selectedRecipes = recipes.filter((r) => selected.includes(r._id));

  if (loading) {
    return (
      <section className={shell.page}>
        <h1>Compare Recipes</h1>
        <p className={shell.muted}>Loading...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className={shell.page}>
        <h1>Compare Recipes</h1>
        <p className={shell.error}>{error}</p>
      </section>
    );
  }

  return (
    <section className={shell.page}>
      <h1>Compare Recipes</h1>

      <div className={shell.gridTwo}>
        <div className={shell.card}>
          <h2>Select Recipes</h2>

          <div className={shell.checklist}>
            {recipes.map((r) => (
              <label key={r._id} className={shell.checkItem}>
                <input
                  type="checkbox"
                  checked={selected.includes(r._id)}
                  onChange={() => toggle(r._id)}
                />
                <span>{r.name}</span>
              </label>
            ))}
          </div>
        </div>

        <div className={shell.card}>
          <h2>Comparison</h2>

          {selectedRecipes.length === 0 ? (
            <p className={shell.muted}>
              Select one or more recipes to compare.
            </p>
          ) : (
            <div className={shell.tableWrap}>
              <table className={shell.table}>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Calories</th>
                    <th>Protein</th>
                    <th>Carbs</th>
                    <th>Fat</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedRecipes.map((r) => (
                    <tr key={r._id}>
                      <td>{r.name}</td>
                      <td>{r.calories.toFixed(1)}</td>
                      <td>{r.protein.toFixed(1)} g</td>
                      <td>{r.carbs.toFixed(1)} g</td>
                      <td>{r.fat.toFixed(1)} g</td>
                      <td>{calculatePrice(r).toFixed(2)} kr</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Compare;
