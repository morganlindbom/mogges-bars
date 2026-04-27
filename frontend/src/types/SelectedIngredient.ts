// filename: src/types/SelectedIngredient.ts

export type SelectedIngredient = {
  /* Selected ingredient.

   Detailed explanation:
   - UI-specific ingredient with grams
*/

  ingredientId: string;

  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;

  grams: number;
};
