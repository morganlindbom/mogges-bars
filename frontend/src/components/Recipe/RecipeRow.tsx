// filename: src/components/Recipe/RecipeRow.tsx

import { Recipe } from "@/types/Recipe";
import { deleteRecipe } from "@/services/recipe.api";

type Props = {
  recipe: Recipe;
  onRefresh: () => void;
};

export default function RecipeRow({ recipe, onRefresh }: Props) {
/* Recipe row.

   Detailed explanation:
   - Purpose: Represent a single recipe
   - Inputs:
     - recipe object
     - refresh callback
   - Outputs: UI element
   - Edge cases:
     - Delete failure
*/

  async function handleDelete() {
/* Handle delete.

   Detailed explanation:
   - Purpose: Remove recipe from backend
   - Inputs: recipe id
   - Outputs: triggers refresh
   - Edge cases:
     - API failure
*/

    try {
      await deleteRecipe(recipe._id);
      onRefresh();
    } catch {
      console.error("Delete failed");
    }
  }

  return (
    <li>
      <strong>{recipe.name}</strong>
      <button onClick={handleDelete}>Delete</button>
    </li>
  );
}