// filename: src/services/ingredient.api.ts

import { Ingredient } from "@/types/Ingredient";

const BASE_URL = "/api/ingredients";

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

export async function getIngredients(): Promise<Ingredient[]> {
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

export async function createIngredient(data: {
  name: string;
  calories: number;
  density: number;
  pricePer1000g: number;
}) {
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