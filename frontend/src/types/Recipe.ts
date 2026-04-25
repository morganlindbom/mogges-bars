// filename: src/types/Recipe.ts

import { SelectedIngredient } from "./SelectedIngredient";

export type Recipe = {
/* Recipe type.

   Detailed explanation:
   - Represents full recipe entity
*/

  _id?: string;
  name: string;
  type: "bar" | "shake";
  ingredients: SelectedIngredient[];
};