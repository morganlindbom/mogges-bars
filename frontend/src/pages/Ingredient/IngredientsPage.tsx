// filename: src/pages/Ingredients/IngredientsPage.tsx

import { useEffect, useState } from "react";
import IngredientTable from "@/components/Ingredient/IngredientTable";
import IngredientForm from "@/components/Ingredient/IngredientForm";
import { getIngredients } from "@/services/ingredient.api";
import { Ingredient } from "@/types/Ingredient";

export default function IngredientsPage() {
  /*Ingredients page.

  Detailed explanation:
  - Purpose: Manage ingredient data lifecycle (fetch, refresh)
  - Inputs: None
  - Outputs: Rendered UI with table and form
  - Edge cases:
    - API failure
    - Empty dataset
  */

  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchIngredients() {
    /*Fetch ingredients from API.

    Detailed explanation:
    - Purpose: Retrieve ingredient data from backend
    - Inputs: None
    - Outputs: Updates state
    - Edge cases:
      - Network failure
      - Invalid response
    */

    try {
      setLoading(true);
      const data = await getIngredients();
      setIngredients(data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch ingredients");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchIngredients();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Ingredients</h1>

      <IngredientForm onSuccess={fetchIngredients} />

      <IngredientTable
        ingredients={ingredients}
        onRefresh={fetchIngredients}
      />
    </div>
  );
}