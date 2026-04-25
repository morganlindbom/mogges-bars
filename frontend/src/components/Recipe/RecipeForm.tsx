// filename: src/components/Recipe/RecipeForm.tsx

import { useState } from "react";
import { createRecipe } from "@/services/recipe.api";
import { useAuth } from "@/auth/useAuth";

type Props = {
  onSuccess: () => void;
};

export default function RecipeForm({ onSuccess }: Props) {
/* Recipe form.

   Detailed explanation:
   - Purpose: Create recipes (auth required)
*/

  const { token } = useAuth();

  const [name, setName] = useState("");
  const [type, setType] = useState<"bar" | "shake">("bar");
  const [error, setError] = useState<string | null>(null);

  if (!token) {
    return <p>You must be logged in to create recipes.</p>;
  }

  async function handleSubmit(e: React.FormEvent) {
/* Handle submit.

   Detailed explanation:
   - Purpose: Send POST request
*/

    e.preventDefault();

    try {
      setError(null);

      await createRecipe({ name, type });

      setName("");
      setType("bar");

      onSuccess();
    } catch {
      setError("Create failed");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      
      <label htmlFor="recipe-name">Recipe Name</label>
      <input
        id="recipe-name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <label htmlFor="recipe-type">Recipe Type</label>
      <select
        id="recipe-type"
        value={type}
        onChange={(e) => setType(e.target.value as "bar" | "shake")}
      >
        <option value="bar">Bar</option>
        <option value="shake">Shake</option>
      </select>

      <button type="submit">Create</button>

      {error && <p>{error}</p>}
    </form>
  );
}