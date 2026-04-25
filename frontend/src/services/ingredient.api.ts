// filename: src/services/ingredient.api.ts

const BASE_URL = "/api/ingredients";

function getAuthHeaders() {
/* Get auth headers.

   Detailed explanation:
   - Purpose: Attach JWT token to requests
   - Inputs: None
   - Outputs: Headers object
   - Edge cases:
     - Missing token
*/

  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  };
}

export async function getIngredients() {
/* Get ingredients.

   Detailed explanation:
   - Purpose: Fetch all ingredients
   - Inputs: None
   - Outputs: Ingredient array
   - Edge cases:
     - API failure
*/

  const res = await fetch(BASE_URL, {
    headers: getAuthHeaders(),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch ingredients");
  }

  return res.json();
}

export async function createIngredient(data: { name: string; calories: number }) {
/* Create ingredient.

   Detailed explanation:
   - Purpose: Create new ingredient
   - Inputs: ingredient data
   - Outputs: created object
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
   - Purpose: Remove ingredient
   - Inputs: ID
   - Outputs: success response
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