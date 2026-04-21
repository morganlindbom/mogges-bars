// filename: src/controllers/ingredient.controller.js

import Ingredient from "#models/ingredient.model";

/**
 * Get all ingredients.
 *
 * Returns all ingredients in the database.
 */
export async function getIngredients(req, res) {

  try {
    const ingredients = await Ingredient.find();

    res.json(ingredients);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


/**
 * Get a single ingredient by ID.
 *
 * Fetches one ingredient document.
 */
export async function getIngredientById(req, res) {

  try {
    const ingredient = await Ingredient.findById(req.params.id);

    if (!ingredient) {
      return res.status(404).json({ error: "Ingredient not found" });
    }

    res.json(ingredient);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


/**
 * Create a new ingredient.
 *
 * Stores nutritional values per 100g.
 */
export async function createIngredient(req, res) {

  try {
    const { name, calories, carbs, fat, protein, density } = req.body;

    // Basic validation
    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }

    const newIngredient = await Ingredient.create({
      name,
      calories,
      carbs,
      fat,
      protein,
      density
    });

    res.status(201).json(newIngredient);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


/**
 * Update an ingredient.
 *
 * Modifies an existing ingredient.
 */
export async function updateIngredient(req, res) {

  try {
    const updated = await Ingredient.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ error: "Ingredient not found" });
    }

    res.json(updated);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


/**
 * Delete an ingredient.
 *
 * Removes an ingredient from the database.
 */
export async function deleteIngredient(req, res) {

  try {
    const deleted = await Ingredient.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ error: "Ingredient not found" });
    }

    res.json({ message: "Ingredient deleted" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}