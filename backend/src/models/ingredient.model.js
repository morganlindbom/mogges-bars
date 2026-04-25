// filename: src/models/ingredient.model.js

import mongoose from "mongoose";

/**
 * Ingredient schema
 *
 * Represents a single ingredient with:
 * - nutritional values (per 100g)
 * - physical properties
 * - pricing
 * - metadata for future features (auth, tracking)
 */
const ingredientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    // Nutritional values (per 100g)
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

    // Physical property
    density: {
      type: Number,
      required: true,
      min: 0
    },

    // 🔥 Pricing (per 1000g)
    pricePer1000g: {
      type: Number,
      required: true,
      min: 0
    },

    // 🔥 Metadata (future use)
    author: {
      type: String,
      lowercase: true,
      trim: true,
      default: null
    }
  },
  {
    timestamps: true // creates createdAt & updatedAt
  }
);

/**
 * Model creation
 *
 * This model is used throughout the application
 * for CRUD operations on ingredients.
 */
const Ingredient = mongoose.model("Ingredient", ingredientSchema);

export default Ingredient;