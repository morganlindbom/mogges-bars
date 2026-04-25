// filename: src/services/recipe.api.ts

import { Recipe } from "@/types/Recipe";

export type RecipeIngredientInput = {
/* Recipe ingredient input.

   Detailed explanation:
   - Backend contract for ingredient inside recipe
*/
  ingredientId: string;
  grams: number;
};

export type CreateRecipePayload = {
/* Create recipe payload.

   Detailed explanation:
   - Payload for POST request
*/
  name: string;
  type: "bar" | "shake";
  ingredients: RecipeIngredientInput[];
};

const BASE_URL = "/api/recipes";

function getAuthHeaders() {
/* Get auth headers.

   Detailed explanation:
   - Attach JWT token if available
*/
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  };
}

export async function getRecipes(): Promise<Recipe[]> {
/* Get recipes.

   Detailed explanation:
   - Fetch all recipes from backend
*/

  const res = await fetch(BASE_URL);

  if (!res.ok) {
    throw new Error("Failed to fetch recipes");
  }

  return res.json();
}

export async function createRecipe(data: CreateRecipePayload) {
/* Create recipe.

   Detailed explanation:
   - Send POST request with correct payload
*/

  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to create recipe");
  }

  return res.json();
}

export async function deleteRecipe(id: string) {
/* Delete recipe.

   Detailed explanation:
   - Remove recipe by ID
*/

  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  if (!res.ok) {
    throw new Error("Failed to delete recipe");
  }

  return res.json();
}