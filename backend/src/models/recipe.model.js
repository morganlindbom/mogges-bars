import mongoose from "mongoose";
const { Schema } = mongoose;

/* Embedded ingredient snapshot.

   Detailed explanation:
   - Keeps ObjectId reference (lab requirement)
   - Stores full ingredient data for performance
*/
const recipeIngredientSchema = new Schema({
  ingredientId: {
    type: Schema.Types.ObjectId,
    ref: "Ingredient",
    required: true
  },

  name: { type: String, required: true },

  grams: { type: Number, required: true },

  calories: { type: Number, required: true },
  protein: { type: Number, required: true },
  carbs: { type: Number, required: true },
  fat: { type: Number, required: true }
});

/* Recipe schema.

   Detailed explanation:
   - Full recipe with calculated totals
*/
const recipeSchema = new Schema(
  {
    name: { type: String, required: true },
    type: { type: String, enum: ["bar", "shake"], required: true },

    ingredients: [recipeIngredientSchema],

    totalWeight: { type: Number, required: true },

    calories: { type: Number, required: true },
    protein: { type: Number, required: true },
    carbs: { type: Number, required: true },
    fat: { type: Number, required: true },

    author: { type: String, required: true }
  },
  { timestamps: true }
);

const Recipe = mongoose.model("Recipe", recipeSchema);

export default Recipe;