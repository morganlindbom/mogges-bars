// filename: src/types/Recipe.ts

export type Recipe = {
  _id: string;

  name: string;
  type: "bar" | "shake";

  ingredients: {
    ingredientId: string;
    grams: number;
  }[];

  totalWeight: number;

  calories: number;
  protein: number;
  carbs: number;
  fat: number;

  author: string;

  createdAt: string;
  updatedAt: string;
};