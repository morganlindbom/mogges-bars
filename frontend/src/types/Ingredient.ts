// filename: src/types/Ingredient.ts

/**
 * Ingredient domain model.
 *
 * Represents a complete ingredient with nutritional values,
 * pricing, and metadata for future user/auth integration.
 */
export type Ingredient = {
  _id: string;

  name: string;

  // Nutritional values (per 100g)
  calories: number;
  carbs: number;
  fat: number;
  protein: number;

  // Physical property
  density: number;

  // Pricing (per 1000g)
  pricePer1000g: number;

  // Metadata (future use)
  author?: string | null;

  createdAt: string; // ISO string
};