// filename: src/pages/Recipes/RecipesPage.tsx

import { useState, useEffect } from "react";
import {
  IngredientsPanel,
  SelectedPanel,
  TotalsPanel,
  ChartPanel,
} from "@/components/CreateRecipe";
import { getIngredients } from "@/services/ingredient.api";
import { createRecipe } from "@/services/recipe.api";
import { useAuth } from "@/auth/useAuth";

import { Ingredient } from "@/types/Ingredient";
import { SelectedIngredient } from "@/types/SelectedIngredient";

export default function RecipesPage() {
  /* Recipes page.

   Detailed explanation:
   - Full builder with correct typing
*/

  const { token } = useAuth();

  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [selectedIngredients, setSelectedIngredients] = useState<
    SelectedIngredient[]
  >([]);
  const [name, setName] = useState("");
  const [type, setType] = useState<"bar" | "shake">("bar");

  useEffect(() => {
    /* Load ingredients */

    getIngredients().then(setIngredients);
  }, []);

  function handleAdd(ingredient: Ingredient) {
    /* Add ingredient */

    setSelectedIngredients((prev) => [
      ...prev,
      {
        ingredientId: ingredient._id,
        name: ingredient.name,
        calories: ingredient.calories,
        grams: 0,
      },
    ]);
  }

  async function handleCreate() {
    /* Create recipe */

    if (!token) return;

    // 🔥 CRITICAL FIX: map to backend format
    const payload = {
      name,
      type,
      ingredients: selectedIngredients.map((item) => ({
        ingredientId: item._id,
        grams: item.grams,
      })),
    };

    await createRecipe(payload);

    setSelectedIngredients([]);
    setName("");
  }

  return (
    <div>
      <h1>Recipes</h1>

      <label htmlFor="name">Recipe Name</label>
      <input id="name" value={name} onChange={(e) => setName(e.target.value)} />

      <label htmlFor="type">Type</label>
      <select
        id="type"
        value={type}
        onChange={(e) => setType(e.target.value as any)}
      >
        <option value="bar">Bar</option>
        <option value="shake">Shake</option>
      </select>

      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}
      >
        <IngredientsPanel ingredients={ingredients} onAdd={handleAdd} />

        <SelectedPanel
          items={selectedIngredients}
          onChange={setSelectedIngredients}
        />

        <TotalsPanel items={selectedIngredients} />
        <ChartPanel items={selectedIngredients} />
      </div>

      {token && <button onClick={handleCreate}>Create</button>}
    </div>
  );
}
