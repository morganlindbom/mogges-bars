// filename: src/components/Recipe/RecipeRow.tsx

import { Recipe } from "@/types/Recipe";
import { deleteRecipe } from "@/services/recipe.api";
import { useAuth } from "@/auth/useAuth";

type Props = Readonly<{
  recipe: Recipe;
  onRefresh: () => void;
}>;

export default function RecipeRow({ recipe, onRefresh }: Props) {
  const { token } = useAuth();

  async function handleDelete() {
    try {
      await deleteRecipe(recipe._id);
      onRefresh();
    } catch {
      console.error("Delete failed");
    }
  }

  return (
    <tr>
      <td>{recipe.name}</td>
      <td>{recipe.type}</td>
      <td>{recipe.calories?.toFixed(1)}</td>
      <td>{recipe.protein?.toFixed(1)} g</td>
      <td>{recipe.carbs?.toFixed(1)} g</td>
      <td>{recipe.fat?.toFixed(1)} g</td>
      <td>
        {token ? (
          <button onClick={handleDelete}>Delete</button>
        ) : (
          "Login required"
        )}
      </td>
    </tr>
  );
}
