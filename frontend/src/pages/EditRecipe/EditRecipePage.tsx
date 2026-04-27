// filename: src/pages/EditRecipe/EditRecipePage.tsx

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./EditRecipePage.module.css";
import { getRecipeById, updateRecipe } from "@/services/recipe.api";
import { getIngredients } from "@/services/ingredient.api";

type Ingredient = {
  _id: string;
  name: string;
};

type RecipeIngredient = {
  ingredientId: string;
  grams: number;
};

type Recipe = {
  _id: string;
  name: string;
  type: "bar" | "shake";
  ingredients: RecipeIngredient[];
};

export default function EditRecipePage() {
/* Full edit page with correct TypeScript and accessibility.

   Detailed explanation:
   - All inputs have labels (htmlFor + id)
   - Fully typed state
   - Scrollable ingredient list
   - Stable update flow
*/

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [name, setName] = useState<string>("");
  const [type, setType] = useState<"bar" | "shake">("bar");
  const [ingredients, setIngredients] = useState<RecipeIngredient[]>([]);
  const [allIngredients, setAllIngredients] = useState<Ingredient[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
/* Load recipe + ingredient catalog */

    if (!id) return;
    const recipeId = id;

    async function load() {
      try {
        const [recipe, ing] = await Promise.all([
          getRecipeById(recipeId),
          getIngredients<Ingredient[]>(),
        ]);

        setName(recipe.name);
        setType(recipe.type);
        setIngredients(recipe.ingredients || []);
        setAllIngredients(ing);
      } catch {
        setError("Failed to load recipe");
      }
    }

    load();
  }, [id]);

  function updateRow(
    index: number,
    field: "ingredientId" | "grams",
    value: string
  ) {
/* Update ingredient row */

    setIngredients((prev) => {
      const copy = [...prev];
      const row = copy[index];

      if (!row) return prev;

      if (field === "grams") {
        row.grams = Number(value);
      } else {
        row.ingredientId = value;
      }

      return copy;
    });
  }

  function addIngredient() {
/* Add ingredient row */

    setIngredients((prev) => [
      ...prev,
      { ingredientId: "", grams: 0 },
    ]);
  }

  function removeIngredient(index: number) {
/* Remove ingredient */

    setIngredients((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
/* Submit update */

    e.preventDefault();

    if (!id) return;

    try {
      await updateRecipe(id, {
        name,
        type,
        ingredients,
      });

      navigate("/recipes");
    } catch {
      setError("Update failed");
    }
  }

  return (
    <section className={styles.page}>
      <h1>Edit Recipe</h1>

      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.card}>
        <form onSubmit={handleSubmit} className={styles.form}>

          {/* BASIC */}
          <div className={styles.row2}>
            <div className={styles.field}>
              <label htmlFor="recipe-name">Name</label>
              <input
                id="recipe-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="recipe-type">Type</label>
              <select
                id="recipe-type"
                value={type}
                onChange={(e) =>
                  setType(e.target.value as "bar" | "shake")
                }
              >
                <option value="bar">Bar</option>
                <option value="shake">Shake</option>
              </select>
            </div>
          </div>

          {/* INGREDIENTS */}
          <div className={styles.ingredientsWrapper}>
            <h3>Ingredients</h3>

            <div className={styles.ingredientsList}>
              {ingredients.map((item, i) => (
                <div key={i} className={styles.ingredientRow}>

                  <div className={styles.inlineField}>
                    <label htmlFor={`ingredient-${i}`}>Ingredient</label>
                    <select
                      id={`ingredient-${i}`}
                      value={item.ingredientId}
                      onChange={(e) =>
                        updateRow(i, "ingredientId", e.target.value)
                      }
                    >
                      <option value="">Select</option>
                      {allIngredients.map((ing) => (
                        <option key={ing._id} value={ing._id}>
                          {ing.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className={styles.inlineField}>
                    <label htmlFor={`grams-${i}`}>Grams</label>
                    <input
                      id={`grams-${i}`}
                      type="number"
                      value={item.grams}
                      onChange={(e) =>
                        updateRow(i, "grams", e.target.value)
                      }
                    />
                  </div>

                  <button
                    type="button"
                    className={styles.remove}
                    onClick={() => removeIngredient(i)}
                    aria-label={`Remove ingredient ${i}`}
                  >
                    ✕
                  </button>

                </div>
              ))}
            </div>

            <button
              type="button"
              className={styles.addBtn}
              onClick={addIngredient}
            >
              + Add Ingredient
            </button>
          </div>

          {/* ACTIONS */}
          <div className={styles.actions}>
            <button type="submit" className={styles.primary}>
              Save
            </button>

            <button
              type="button"
              className={styles.secondary}
              onClick={() => navigate("/recipes")}
            >
              Cancel
            </button>
          </div>

        </form>
      </div>
    </section>
  );
}