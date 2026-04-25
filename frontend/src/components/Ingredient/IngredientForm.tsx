// filename: src/components/Ingredient/IngredientForm.tsx

import { useState } from "react";
import { createIngredient } from "@/services/ingredient.api";
import { useAuth } from "@/auth/useAuth";

export default function IngredientForm({ onSuccess }: any) {
/* Ingredient form.

   Detailed explanation:
   - Purpose: Create ingredient (auth required)
*/

  const { token } = useAuth();

  const [name, setName] = useState("");
  const [calories, setCalories] = useState(0);

  if (!token) {
    return <p>You must be logged in to add ingredients.</p>;
  }

  async function handleSubmit(e: any) {
/* Handle submit.

   Detailed explanation:
   - Purpose: Create ingredient
*/

    e.preventDefault();

    await createIngredient({ name, calories });

    onSuccess();
  }

  return (
    <form onSubmit={handleSubmit}>

      <label htmlFor="ingredient-name">Ingredient Name</label>
      <input
        id="ingredient-name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <label htmlFor="ingredient-calories">Calories</label>
      <input
        id="ingredient-calories"
        type="number"
        value={calories}
        onChange={(e) => setCalories(Number(e.target.value))}
        required
      />

      <button type="submit">Add</button>

    </form>
  );
}