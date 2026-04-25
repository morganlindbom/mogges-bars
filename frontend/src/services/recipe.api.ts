// filename: src/services/recipe.api.ts

const BASE_URL = "/api/recipes";

function getAuthHeaders() {
/* Get auth headers.

   Detailed explanation:
   - Purpose: Attach JWT token to requests
*/

  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  };
}

export async function getRecipes() {
/* Get all recipes.

   Detailed explanation:
   - Purpose: Fetch all recipes
*/

  const res = await fetch(BASE_URL);

  if (!res.ok) {
    throw new Error("Failed to fetch recipes");
  }

  return res.json();
}

export async function createRecipe(data: { name: string; type: "bar" | "shake" }) {
/* Create recipe.

   Detailed explanation:
   - Purpose: Create new recipe
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
   - Purpose: Remove recipe
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