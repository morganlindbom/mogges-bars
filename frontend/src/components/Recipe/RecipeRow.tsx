// filename: src/components/Recipe/RecipeRow.tsx

import { Recipe } from "@/types/Recipe";
import { deleteRecipe } from "@/services/recipe.api";
import { useAuth } from "@/auth/useAuth";
import { useNavigate } from "react-router-dom";
import styles from "./RecipeRow.module.css";

type Props = Readonly<{
  recipe: Recipe;
  onRefresh: () => void;
}>;

export default function RecipeRow({ recipe, onRefresh }: Props) {
/* Recipe row component.

   Detailed explanation:
   - Displays recipe data
   - Handles edit navigation
   - Handles delete action
*/

  const { token } = useAuth();
  const navigate = useNavigate();

  function handleEdit() {
/* Navigate to edit page */

    navigate(`/recipes/${recipe._id}/edit`);
  }

  async function handleDelete() {
/* Delete recipe */

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
          <>
            <button
              type="button"
              onClick={handleEdit}
              aria-label={`Edit ${recipe.name}`}
              className={styles.iconButton}
            >
              <img
                src="/edit-icon-orange-pencil-0.png"
                alt=""
                aria-hidden="true"
                className={styles.iconImage}
              />
            </button>

            <button type="button" onClick={handleDelete}>
              ❌
            </button>
          </>
        ) : (
          "Login required"
        )}
      </td>
    </tr>
  );
}