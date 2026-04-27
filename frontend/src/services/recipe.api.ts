// filename: src/services/recipe.api.ts

import { Recipe } from "@/types/Recipe";

type RecipeType = "bar" | "shake";

type GetRecipesOptions = {
  type?: RecipeType;
};

export type RecipeIngredientInput = {
  /* Recipe ingredient input.

   Detailed explanation:
   - Represents one ingredient in a recipe
   - Links ingredientId with grams
  */
  ingredientId: string;
  grams: number;
};

export type CreateRecipePayload = {
  /* Create recipe payload.

   Detailed explanation:
   - Used for POST
  */
  name: string;
  type: RecipeType;
  ingredients: RecipeIngredientInput[];
};

export type UpdateRecipePayload = {
  /* Update recipe payload.

   Detailed explanation:
   - Used for PUT/PATCH
   - Same structure as create
  */
  name: string;
  type: RecipeType;
  ingredients: RecipeIngredientInput[];
};

const BASE_URL = "/api/recipes";

function getAuthHeaders() {
/* Get auth headers.

   Detailed explanation:
   - Attaches JWT if exists
*/

  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  };
}

export async function getRecipes<T = Recipe[]>(
  options: GetRecipesOptions = {},
): Promise<T> {
/* Fetch all recipes.

   Detailed explanation:
   - Supports filtering by type
*/

  const params = new URLSearchParams();

  if (options.type) {
    params.set("type", options.type);
  }

  const url = params.size > 0
    ? `${BASE_URL}?${params.toString()}`
    : BASE_URL;

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Failed to fetch recipes");
  }

  return res.json();
}

export async function getRecipeById(id: string): Promise<Recipe> {
/* Fetch single recipe.

   Detailed explanation:
   - Used in edit page
   - Returns full recipe object
*/

  const res = await fetch(`${BASE_URL}/${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch recipe");
  }

  return res.json();
}

export async function createRecipe(data: CreateRecipePayload) {
/* Create recipe.

   Detailed explanation:
   - POST new recipe
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

export async function updateRecipe(id: string, data: UpdateRecipePayload) {
/* Update recipe.

   Detailed explanation:
   - PUT request to update existing recipe
   - Required for edit functionality
*/

  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT", // or PATCH depending on backend
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to update recipe");
  }

  return res.json();
}

export async function deleteRecipe(id: string) {
/* Delete recipe.

   Detailed explanation:
   - Removes recipe from database
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