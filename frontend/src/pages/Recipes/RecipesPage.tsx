// filename: frontend/src/pages/Recipes/RecipesPage.tsx

import { useEffect, useState } from "react";
import {
  IngredientsPanel,
  SelectedPanel,
  TotalsPanel,
  ChartPanel,
} from "@/components/CreateRecipe";
import { getIngredients } from "@/services/ingredient.api";
import { createRecipe } from "@/services/recipe.api";
import { Ingredient, SelectedIngredient } from "@/types";
import { useAuth } from "@/auth/useAuth";
import styles from "./RecipesPage.module.css";

function RecipesPage() {
/* Recipes page with improved symmetric layout.

   Detailed explanation:
   - Grid-based form layout
   - Button aligned with inputs
   - Status messages placed below
   - Stable dashboard panels
*/

  const { token } = useAuth();

  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [selected, setSelected] = useState<SelectedIngredient[]>([]);
  const [name, setName] = useState("");
  const [type, setType] = useState<"bar" | "shake">("bar");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    getIngredients()
      .then((data) => {
        setIngredients(data);
        setError(null);
      })
      .catch(() => {
        setError("Failed to load ingredients.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  function handleAdd(ingredient: Ingredient) {
/* Add ingredient to selection */

    setSelected((prev) => [
      ...prev,
      {
        ingredientId: ingredient._id,
        name: ingredient.name,
        calories: ingredient.calories,
        protein: ingredient.protein,
        carbs: ingredient.carbs,
        fat: ingredient.fat,
        grams: 25,
      },
    ]);

    setMessage(null);
  }

  async function handleCreate() {
/* Create recipe */

    if (!token) {
      setError("You must be logged in to create recipes.");
      return;
    }

    const trimmedName = name.trim();

    const validIngredients = selected
      .filter((item) => item.grams > 0)
      .map((item) => ({
        ingredientId: item.ingredientId,
        grams: item.grams,
      }));

    if (!trimmedName) {
      setError("Recipe name is required.");
      return;
    }

    if (validIngredients.length === 0) {
      setError("Add at least one ingredient.");
      return;
    }

    setSubmitting(true);
    setError(null);
    setMessage(null);

    try {
      await createRecipe({
        name: trimmedName,
        type,
        ingredients: validIngredients,
      });

      setSelected([]);
      setName("");
      setType("bar");
      setMessage("Recipe created.");
    } catch {
      setError("Create failed.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className={styles.page}>
      <h1>Recipes</h1>

      {/* 🔥 STATUS ROW */}
      {(error || message || !token) && (
        <div className={styles.statusRow}>
          {!token && (
            <p className={styles.muted}>Login required to save.</p>
          )}
          {error && <p className={styles.error}>{error}</p>}
          {message && <p className={styles.success}>{message}</p>}
        </div>
      )}

      {/* ===== FORM ===== */}
      <div className={styles.formCard}>
        <div className={styles.formGrid}>

          <label className={styles.field} htmlFor="recipe-name">
            <span>Recipe Name</span>
            <input
              id="recipe-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Peanut Crunch"
            />
          </label>

          <label className={styles.field} htmlFor="recipe-type">
            <span>Type</span>
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
          </label>

          {/* 🔥 BUTTON IN GRID */}
          <div className={styles.buttonWrapper}>
            <button
              className={styles.primaryButton}
              onClick={handleCreate}
              disabled={!token || submitting}
              type="button"
            >
              {submitting ? "Creating..." : "Create Recipe"}
            </button>
          </div>
        </div>
      </div>

      {/* ===== PANELS ===== */}
      {loading ? (
        <p className={styles.muted}>Loading ingredients...</p>
      ) : (
        <div className={styles.panelGrid}>
          <article className={styles.panel}>
            <IngredientsPanel
              ingredients={ingredients}
              onAdd={handleAdd}
            />
          </article>

          <article className={styles.panel}>
            <SelectedPanel
              items={selected}
              onChange={setSelected}
            />
          </article>

          <article className={styles.panel}>
            <TotalsPanel items={selected} />
          </article>

          <article className={styles.panel}>
            <ChartPanel items={selected} />
          </article>
        </div>
      )}
    </section>
  );
}

export default RecipesPage;