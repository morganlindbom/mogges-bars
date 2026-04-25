// filename: src/components/Ingredient/IngredientRow.tsx

import { Ingredient } from "@/types/Ingredient";
import { deleteIngredient } from "@/services/ingredient.api";

type Props = {
  ingredient: Ingredient;
  onRefresh: () => void;
};

export default function IngredientRow({ ingredient, onRefresh }: Props) {
  /*Ingredient row.

  Detailed explanation:
  - Purpose: Represent a single ingredient row
  - Inputs:
    - ingredient object
    - refresh callback
  - Outputs: Table row
  - Edge cases:
    - delete failure
  */

  async function handleDelete() {
    /*Delete ingredient.

    Detailed explanation:
    - Purpose: Remove ingredient from backend
    - Inputs: ingredient id
    - Outputs: triggers refresh
    - Edge cases:
      - API failure
    */

    try {
      await deleteIngredient(ingredient._id);
      onRefresh();
    } catch (err) {
      console.error("Delete failed");
    }
  }

  return (
    <tr>
      <td>{ingredient.name}</td>
      <td>{ingredient.calories}</td>
      <td>
        <button onClick={handleDelete}>Delete</button>
      </td>
    </tr>
  );
}