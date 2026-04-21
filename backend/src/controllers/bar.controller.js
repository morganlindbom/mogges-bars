// filename: src/controllers/bar.controller.js

import Bar from "#models/bar.model";
import Ingredient from "#models/ingredient.model";

/**
 * Get all bars.
 *
 * Retrieves all bars and populates ingredient references.
 */
export async function getBars(req, res) {

  try {
    const bars = await Bar.find()
      .populate("ingredients.ingredientId");

    res.json(bars);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


/**
 * Get a single bar by ID.
 *
 * Fetches one bar and includes ingredient details.
 */
export async function getBarById(req, res) {

  try {
    const bar = await Bar.findById(req.params.id)
      .populate("ingredients.ingredientId");

    if (!bar) {
      return res.status(404).json({ error: "Bar not found" });
    }

    res.json(bar);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


/**
 * Create a new bar with calculated nutrition.
 *
 * Computes nutritional totals based on ingredient composition.
 */
export async function createBar(req, res) {

  try {
    const { name, ingredients } = req.body;

    let totalCalories = 0;
    let totalProtein = 0;
    let totalCarbs = 0;
    let totalFat = 0;

    for (const item of ingredients) {

      const ing = await Ingredient.findById(item.ingredientId);

      if (!ing) {
        return res.status(404).json({ error: "Ingredient not found" });
      }

      const factor = item.grams / 100;

      totalCalories += ing.calories * factor;
      totalProtein += ing.protein * factor;
      totalCarbs += ing.carbs * factor;
      totalFat += ing.fat * factor;
    }

    const newBar = await Bar.create({
      name,
      ingredients,
      totalCalories,
      totalProtein,
      totalCarbs,
      totalFat
    });

    res.status(201).json(newBar);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


/**
 * Update a bar.
 *
 * Updates an existing bar document.
 */
export async function updateBar(req, res) {

  try {
    const updated = await Bar.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: "Bar not found" });
    }

    res.json(updated);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


/**
 * Delete a bar.
 *
 * Removes a bar from the database.
 */
export async function deleteBar(req, res) {

  try {
    const deleted = await Bar.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ error: "Bar not found" });
    }

    res.json({ message: "Bar deleted" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}