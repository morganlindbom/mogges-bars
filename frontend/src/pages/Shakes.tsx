// filename: src/pages/Shakes.tsx

import { useEffect, useState } from "react";
import { getRecipes } from "@/services/recipe.api";
import RecipeList from "@/components/Recipe/RecipeList";
import { Recipe } from "@/types/Recipe";

export default function Shakes() {
/* Shakes page.

   Detailed explanation:
   - Purpose: Display recipes filtered as shakes
   - Inputs: None
   - Outputs: Filtered list of recipes
   - Edge cases:
     - No matching recipes
     - API failure
*/

  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchShakes() {
/* Fetch shakes.

   Detailed explanation:
   - Purpose: Retrieve all recipes and filter shakes
   - Inputs: None
   - Outputs: Updates state
   - Edge cases:
     - Network failure
*/

    try {
      setLoading(true);

      const data = await getRecipes();

      const shakes = data.filter((r: Recipe) => r.type === "shake");

      setRecipes(shakes);
      setError(null);
    } catch {
      setError("Failed to fetch shakes");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
/* Effect hook.

   Detailed explanation:
   - Purpose: Load shakes on mount
   - Inputs: None
   - Outputs: Calls fetchShakes
*/

    fetchShakes();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Shakes</h1>

      <RecipeList recipes={recipes} onRefresh={fetchShakes} />
    </div>
  );
}