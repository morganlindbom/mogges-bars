// filename: src/pages/Recipes/RecipesPage.tsx

import { useEffect, useState } from "react";
import RecipeList from "@/components/Recipe/RecipeList";
import RecipeForm from "@/components/Recipe/RecipeForm";
import { getRecipes } from "@/services/recipe.api";
import { Recipe } from "@/types/Recipe";

export default function RecipesPage() {
/* Recipes page.

   Detailed explanation:
   - Purpose: Manage the lifecycle of recipe data (fetching, refreshing)
   - Inputs: None
   - Outputs: Rendered UI with list and form
   - Edge cases:
     - API failure
     - Empty dataset
*/

  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchRecipes() {
/* Fetch recipes.

   Detailed explanation:
   - Purpose: Retrieve recipe data from backend
   - Inputs: None
   - Outputs: Updates state
   - Edge cases:
     - Network failure
     - Invalid response
*/

    try {
      setLoading(true);
      const data = await getRecipes();
      setRecipes(data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch recipes");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
/* Effect hook.

   Detailed explanation:
   - Purpose: Trigger initial data fetch on component mount
   - Inputs: None
   - Outputs: Calls fetchRecipes once
   - Edge cases:
     - None
*/

    fetchRecipes();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Recipes</h1>

      <RecipeForm onSuccess={fetchRecipes} />

      <RecipeList
        recipes={recipes}
        onRefresh={fetchRecipes}
      />
    </div>
  );
}