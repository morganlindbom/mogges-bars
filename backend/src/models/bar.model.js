// filename: src/models/bar.model.js

import mongoose from "mongoose";

/**
 * Bar schema
 *
 * Defines nutritional values per bar.
 */
const barSchema = new mongoose.Schema(
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

/**
 * Model creation
 */
const Bar = mongoose.model("Bar", barSchema);

export default Bar;