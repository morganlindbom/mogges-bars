// filename: src/components/Ingredient/IngredientTable.tsx

import { Ingredient } from "@/types/Ingredient";
import IngredientRow from "./IngredientRow";

type Props = {
  ingredients: Ingredient[];
  onRefresh: () => void;
};

export default function IngredientTable({ ingredients, onRefresh }: Props) {
  /*Ingredient table.

  Detailed explanation:
  - Purpose: Display list of ingredients
  - Inputs:
    - ingredients: Ingredient[]
    - onRefresh: callback function
  - Outputs: Table UI
  - Edge cases:
    - Empty list
  */

  if (ingredients.length === 0) {
    return <p>No ingredients found</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Calories</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {ingredients.map((ingredient) => (
          <IngredientRow
            key={ingredient._id}
            ingredient={ingredient}
            onRefresh={onRefresh}
          />
        ))}
      </tbody>
    </table>
  );
}