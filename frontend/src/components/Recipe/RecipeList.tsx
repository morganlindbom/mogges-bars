// filename: src/components/Recipe/RecipeList.tsx

import { Recipe } from "@/types/Recipe";
import RecipeRow from "./RecipeRow";

type Props = {
  recipes: Recipe[];
  onRefresh: () => void;
};

export default function RecipeList({ recipes, onRefresh }: Props) {
/* Recipe list.

   Detailed explanation:
   - Purpose: Render collection of recipes
   - Inputs:
     - recipes array
     - refresh callback
   - Outputs: List UI
   - Edge cases:
     - Empty list
*/

  if (recipes.length === 0) {
    return <p>No recipes found</p>;
  }

  return (
    <ul>
      {recipes.map((recipe) => (
        <RecipeRow
          key={recipe._id}
          recipe={recipe}
          onRefresh={onRefresh}
        />
      ))}
    </ul>
  );
}