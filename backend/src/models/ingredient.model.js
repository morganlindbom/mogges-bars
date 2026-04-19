// filename: src/models/ingredient.model.js

import mongoose from "mongoose";

const ingredientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    density: {
      type: Number,
      required: true,
      min: 0
    },

    calories: {
      type: Number,
      required: true,
      min: 0
    },

    protein: {
      type: Number,
      required: true,
      min: 0
    },

    fat: {
      type: Number,
      required: true,
      min: 0
    },

    carbs: {
      type: Number,
      required: true,
      min: 0
    }
  },
  {
    timestamps: true
  }
);

const Ingredient = mongoose.model("Ingredient", ingredientSchema);

export default Ingredient;