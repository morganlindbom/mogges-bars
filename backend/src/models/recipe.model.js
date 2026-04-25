// filename: src/models/recipe.model.js

import mongoose from "mongoose";

/**
 * Recipe schema
 *
 * Unified model for both bars and shakes.
 * Controlled via "type".
 */
const recipeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    type: {
      type: String,
      enum: ["bar", "shake"],
      required: true
    },

    ingredients: [
      {
        ingredientId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Ingredient",
          required: true
        },
        grams: {
          type: Number,
          required: true,
          min: 0
        }
      }
    ],

    totalWeight: {
      type: Number,
      required: true
    },

    calories: Number,
    protein: Number,
    carbs: Number,
    fat: Number,

    author: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Recipe", recipeSchema);