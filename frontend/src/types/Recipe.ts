// filename: frontend/src/types/Recipe.ts

export type RecipeIngredient = {
/* Recipe ingredient.

   Detailed explanation:
   - Matches backend embedded snapshot
*/

  ingredientId: string;

  name: string;

  grams: number;

  calories: number;
  protein: number;
  carbs: number;
  fat: number;
};

export type Recipe = {
/* Recipe type.

   Detailed explanation:
   - Full recipe object used in UI
*/

  _id: string;

  name: string;
  type: "bar" | "shake";

  ingredients: RecipeIngredient[];

  totalWeight: number;

  calories: number;
  protein: number;
  carbs: number;
  fat: number;

  author: string;

  createdAt: string;
  updatedAt: string;
};