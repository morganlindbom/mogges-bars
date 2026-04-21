// filename: src/models/ingredient.model.js

import mongoose from "mongoose";

/**
 * Ingredient schema
 *
 * Defines nutritional values per ingredient.
 */
const ingredientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    calories: {
      type: Number,
      required: true,
      min: 0
    },

    carbs: {
      type: Number,
      required: true,
      min: 0
    },

    fat: {
      type: Number,
      required: true,
      min: 0
    },

    protein: {
      type: Number,
      required: true,
      min: 0
    },

    density: {
      type: Number,
      required: true,
      min: 0
    }
  },
  {
    timestamps: true
  }
);

/**
 * Model creation
 */
const Ingredient = mongoose.model("Ingredient", ingredientSchema);

export default Ingredient;