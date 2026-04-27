// filename: src/services/ingredient.api.ts

import { Ingredient } from "@/types/Ingredient";

const BASE_URL = "/api/ingredients";

type CreateIngredientPayload = {
  name: string;
  calories: number;
  carbs: number;
  fat: number;
  protein: number;
  density: number;
  pricePer1000g: number;
};

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

export async function getIngredients<T = Ingredient[]>(): Promise<T> {
  /* Get ingredients.

   Detailed explanation:
   - Fetch all ingredients from backend
*/
  const res = await fetch(BASE_URL);

  if (!res.ok) {
    throw new Error("Failed to fetch ingredients");
  }

  return res.json();
}

export async function getIngredientById(id: string): Promise<Ingredient> {
  const res = await fetch(`${BASE_URL}/${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch ingredient");
  }

  return res.json();
}

export async function createIngredient(data: CreateIngredientPayload) {
  /* Create ingredient.

   Detailed explanation:
   - Send POST request to create ingredient
*/
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to create ingredient");
  }

  return res.json();
}

export async function updateIngredient(
  id: string,
  data: CreateIngredientPayload,
) {
  /* Update ingredient.

   Detailed explanation:
   - Send PUT request to update ingredient by ID
*/
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to update ingredient");
  }

  return res.json();
}

export async function deleteIngredient(id: string) {
  /* Delete ingredient.

   Detailed explanation:
   - Remove ingredient by ID
*/
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  if (!res.ok) {
    throw new Error("Failed to delete ingredient");
  }

  return res.json();
}
