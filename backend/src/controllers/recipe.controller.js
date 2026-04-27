// filename: backend/src/controllers/recipe.controller.js

import {
  createRecipeService,
  getRecipesService,
  getRecipeByIdService,
  updateRecipeService,
  deleteRecipeService
} from "../services/recipe.service.js";

/* Get all recipes with optional filter */
export async function getRecipes(req, res) {
/* Get recipes.

   Detailed explanation:
   - Reads query params
   - Passes filter to service
*/

  try {
    const { type } = req.query;

    const recipes = await getRecipesService(type);

    res.json(recipes);

  } catch (error) {
    console.error("GET RECIPES ERROR:", error);
    res.status(500).json({ error: error.message });
  }
}

/* Get recipe by ID */
export async function getRecipeById(req, res) {
/* Get recipe by ID.

   Detailed explanation:
   - Fetches one recipe
   - Returns 404 if not found
*/

  try {
    const { id } = req.params;

    const recipe = await getRecipeByIdService(id);

    if (!recipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }

    res.json(recipe);

  } catch (error) {
    console.error("GET RECIPE BY ID ERROR:", error);
    res.status(500).json({ error: error.message });
  }
}

/* Create recipe */
export async function createRecipe(req, res) {
/* Create recipe.

   Detailed explanation:
   - Uses authenticated user
   - Delegates to service
*/

  try {
    const userEmail = req.user?.email;

    const recipe = await createRecipeService(req.body, userEmail);

    res.status(201).json(recipe);

  } catch (error) {
    console.error("CREATE RECIPE ERROR:", error);
    res.status(500).json({ error: error.message });
  }
}

/* Update recipe */
export async function updateRecipe(req, res) {
/* Update recipe.

   Detailed explanation:
   - Updates recipe by ID
   - Uses service layer
   - Returns updated document
*/

  try {
    const { id } = req.params;

    const updated = await updateRecipeService(id, req.body);

    if (!updated) {
      return res.status(404).json({ error: "Recipe not found" });
    }

    res.json(updated);

  } catch (error) {
    console.error("UPDATE RECIPE ERROR:", error);
    res.status(500).json({ error: error.message });
  }
}

/* Delete recipe */
export async function deleteRecipe(req, res) {
/* Delete recipe.

   Detailed explanation:
   - Deletes recipe by ID
   - Returns confirmation
*/

  try {
    const { id } = req.params;

    const deleted = await deleteRecipeService(id);

    if (!deleted) {
      return res.status(404).json({ error: "Recipe not found" });
    }

    res.json({ message: "Recipe deleted successfully" });

  } catch (error) {
    console.error("DELETE RECIPE ERROR:", error);
    res.status(500).json({ error: error.message });
  }
}