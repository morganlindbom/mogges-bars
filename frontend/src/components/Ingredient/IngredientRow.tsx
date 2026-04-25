// filename: src/components/Ingredient/IngredientRow.tsx

import { Ingredient } from "@/types/Ingredient";
import { deleteIngredient } from "@/services/ingredient.api";
import { useAuth } from "@/auth/useAuth";

type Props = Readonly<{
  ingredient: Ingredient;
  onRefresh: () => void;
}>;

export default function IngredientRow({ ingredient, onRefresh }: Props) {
  const { token } = useAuth();

  async function handleDelete() {
    try {
      await deleteIngredient(ingredient._id);
      onRefresh();
    } catch {
      console.error("Delete failed");
    }
  }

  return (
    <tr>
      <td>{ingredient.name}</td>
      <td>{ingredient.calories}</td>
      <td>{ingredient.protein}</td>
      <td>{ingredient.carbs}</td>
      <td>{ingredient.fat}</td>
      <td>{ingredient.pricePer1000g}</td>
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
