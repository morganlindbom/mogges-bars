// filename: src/controllers/ingredient.controller.js

/**
 * Ingredient controller.
 *
 * Handles HTTP requests for ingredient resources.
 * Delegates data operations to the model layer.
 */

import Ingredient from "#models/ingredient.model";

/**
 * Get all ingredients
 *
 * Returns all ingredients in the system.
 */
export async function getIngredients(req, res, next) {
    try {
        const ingredients = await Ingredient.find();
        res.json(ingredients);
    } catch (err) {
        next(err);
    }
}

/**
 * Get single ingredient by ID
 */
export async function getIngredientById(req, res, next) {
    try {
        const { id } = req.params;

        const ingredient = await Ingredient.findById(id);

        if (!ingredient) {
            return res.status(404).json({ message: "Ingredient not found" });
        }

        res.json(ingredient);
    } catch (err) {
        next(err);
    }
}

/**
 * Create ingredient
 *
 * Uses authenticated user as owner.
 */
export async function createIngredient(req, res, next) {
    try {
        const {
            name,
            density,
            calories,
            protein,
            fat,
            carbs
        } = req.body;

        /**
         * Basic validation
         */
        if (!name || density == null || calories == null || protein == null || fat == null || carbs == null) {
            return res.status(400).json({
                message: "Missing required fields"
            });
        }

        /**
         * Create ingredient with ownership
         */
        const ingredient = await Ingredient.create({
            name,
            density,
            calories,
            protein,
            fat,
            carbs,
            createdBy: req.user.id
        });

        res.status(201).json(ingredient);

    } catch (err) {
        next(err);
    }
}

/**
 * Update ingredient
 */
export async function updateIngredient(req, res, next) {
    try {
        const { id } = req.params;

        const updated = await Ingredient.findByIdAndUpdate(
            id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!updated) {
            return res.status(404).json({ message: "Ingredient not found" });
        }

        res.json(updated);

    } catch (err) {
        next(err);
    }
}

/**
 * Delete ingredient
 */
export async function deleteIngredient(req, res, next) {
    try {
        const { id } = req.params;

        const deleted = await Ingredient.findByIdAndDelete(id);

        if (!deleted) {
            return res.status(404).json({ message: "Ingredient not found" });
        }

        res.status(204).send();

    } catch (err) {
        next(err);
    }
}