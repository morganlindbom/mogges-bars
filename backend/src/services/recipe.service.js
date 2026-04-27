// filename: backend/src/services/recipe.service.js

import Recipe from "../models/recipe.model.js";
import Ingredient from "../models/ingredient.model.js";

/* Build enriched ingredient list.

   Detailed explanation:
   - Fetches ingredient data from DB
   - Combines with grams
   - Adds macro values
*/
async function buildEnrichedIngredients(ingredientsInput) {

  const enriched = [];

  for (const item of ingredientsInput) {

    const ingredient = await Ingredient.findById(item.ingredientId);

    if (!ingredient) {
      throw new Error("Ingredient not found");
    }

    enriched.push({
      ingredientId: ingredient._id,
      name: ingredient.name,
      grams: item.grams,

      calories: ingredient.calories || 0,
      protein: ingredient.protein || 0,
      carbs: ingredient.carbs || 0,
      fat: ingredient.fat || 0
    });
  }

  return enriched;
}

/* Calculate totals.

   Detailed explanation:
   - Calculates weight + macros
   - Based on enriched ingredients
*/
function calculateTotals(enrichedIngredients) {

  let totalWeight = 0;
  let calories = 0;
  let protein = 0;
  let carbs = 0;
  let fat = 0;

  for (const item of enrichedIngredients) {

    totalWeight += item.grams;

    const factor = item.grams / 100;

    calories += item.calories * factor;
    protein += item.protein * factor;
    carbs += item.carbs * factor;
    fat += item.fat * factor;
  }

  return {
    totalWeight,
    calories,
    protein,
    carbs,
    fat
  };
}

/* Get all recipes */
export async function getRecipesService(type) {
/* Get recipes with optional filter */

  const filter = {};

  if (type) {
    filter.type = type;
  }

  return Recipe.find(filter).sort({ createdAt: -1 });
}

/* Get recipe by ID */
export async function getRecipeByIdService(id) {
/* Get single recipe */

  return Recipe.findById(id);
}

/* Create recipe */
export async function createRecipeService(data, userEmail) {
/* Create recipe with enrichment */

  const enrichedIngredients = await buildEnrichedIngredients(data.ingredients);

  const totals = calculateTotals(enrichedIngredients);

  return Recipe.create({
    name: data.name,
    type: data.type,
    ingredients: enrichedIngredients,

    ...totals,

    author: userEmail
  });
}

/* Update recipe */
export async function updateRecipeService(id, data) {
/* Update recipe.

   Detailed explanation:
   - Rebuilds ingredients
   - Recalculates macros
   - Updates document
*/

  const enrichedIngredients = await buildEnrichedIngredients(data.ingredients);

  const totals = calculateTotals(enrichedIngredients);

  return Recipe.findByIdAndUpdate(
    id,
    {
      name: data.name,
      type: data.type,
      ingredients: enrichedIngredients,
      ...totals
    },
    {
      new: true,
      runValidators: true
    }
  );
}

/* Delete recipe */
export async function deleteRecipeService(id) {
/* Delete recipe */

  return Recipe.findByIdAndDelete(id);
}