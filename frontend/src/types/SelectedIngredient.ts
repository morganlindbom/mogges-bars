// filename: src/types/SelectedIngredient.ts

import { Ingredient } from "./Ingredient";

export type SelectedIngredient = {
/* Selected ingredient.

   Detailed explanation:
   - UI-specific ingredient with grams
*/

  ingredientId: string;

  name: string;
  calories: number;

  grams: number;
};