// filename: src/models/bar.model.js

import mongoose from "mongoose";

/**
 * Bar schema
 *
 * Stores ingredients and calculated nutrition.
 */
const barSchema = new mongoose.Schema(
  {
    name: {
      type: String,
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

    totalCalories: Number,
    totalProtein: Number,
    totalCarbs: Number,
    totalFat: Number
  },
  {
    timestamps: true
  }
);

const Bar = mongoose.model("Bar", barSchema);

export default Bar;