// filename: src/controllers/recipe.controller.js

import Recipe from "#models/recipe.model";

/**
 * Create recipe
 */
export async function createRecipe(req, res) {
  try {
    const recipe = await Recipe.create({
      ...req.body,
      author: req.user?.userId || "mogge@mogge.se"
    });

    res.status(201).json(recipe);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
}

/**
 * Get recipes (filter by type)
 */
export async function getRecipes(req, res) {
  try {
    const { type } = req.query;

    const filter = type ? { type } : {};

    const recipes = await Recipe.find(filter);

    res.json(recipes);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}