// filename: src/types/Bar.ts

/**
 * Ingredient reference inside a bar.
 */
export type BarIngredient = {
  ingredientId: {
    _id: string;
    name: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  grams: number;
};

/**
 * Bar type definition.
 *
 * Matches backend schema exactly.
 */
export type Bar = {
  _id: string;
  name: string;

  ingredients: BarIngredient[];

  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;

  createdAt?: string;
  updatedAt?: string;
};


/**
 * Props for BarList component.
 */
export type BarListProps = {
  bars: Bar[];
  onDelete: (id: string) => void;
};


/**
 * Props for BarRow component.
 */
export type BarRowProps = {
  bar: Bar;
  onDelete: (id: string) => void;
};