// filename: src/pages/Statistics.tsx

import { useEffect, useState } from "react";
import { Recipe } from "@/types/Recipe";
import styles from "./Statistics.module.css";
import shell from "./PageShell.module.css";
import { getRecipes } from "@/services/recipe.api";
import { getIngredients } from "@/services/ingredient.api";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

type Ingredient = {
  _id: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  pricePer1000g: number;
};

/**
 * Statistics page.
 *
 * All analysis is recalculated per 100g from ingredients.
 */
function Statistics() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const [recipeData, ingredientData] = await Promise.all([
          getRecipes<Recipe[]>(),
          getIngredients<Ingredient[]>(),
        ]);

        setRecipes(recipeData);
        setIngredients(ingredientData);
        setError(null);
      } catch {
        setError("Failed to load statistics data.");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  function toggle(id: string) {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  }

  function calculatePer100(recipe: Recipe) {
    const totals = {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
      grams: 0,
      price: 0,
    };

    recipe.ingredients.forEach((item) => {
      const ing = ingredients.find((i) => i._id === item.ingredientId);
      if (!ing) return;

      const factor = item.grams / 100;

      totals.calories += ing.calories * factor;
      totals.protein += ing.protein * factor;
      totals.carbs += ing.carbs * factor;
      totals.fat += ing.fat * factor;
      totals.grams += item.grams;

      totals.price += (ing.pricePer1000g / 1000) * item.grams;
    });

    if (totals.grams === 0) return null;

    return {
      calories: (totals.calories / totals.grams) * 100,
      protein: (totals.protein / totals.grams) * 100,
      carbs: (totals.carbs / totals.grams) * 100,
      fat: (totals.fat / totals.grams) * 100,
      price: (totals.price / totals.grams) * 100,
    };
  }

  const selectedRecipes = recipes.filter((r) => selected.includes(r._id));

  const macroData = selectedRecipes.map((r) => {
    const data = calculatePer100(r);
    return {
      name: r.name,
      protein: data?.protein || 0,
      carbs: data?.carbs || 0,
      fat: data?.fat || 0,
    };
  });

  const priceData = selectedRecipes.map((r) => {
    const data = calculatePer100(r);
    return {
      name: r.name,
      price: data?.price || 0,
    };
  });

  if (loading) {
    return (
      <section className={shell.page}>
        <h1>Statistics</h1>
        <p className={shell.muted}>Loading...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className={shell.page}>
        <h1>Statistics</h1>
        <p className={shell.error}>{error}</p>
      </section>
    );
  }

  return (
    <section className={shell.page}>
      <h1>Statistics</h1>

      <div className={styles.container}>
        <div className={shell.card}>
          <h2>Overview</h2>
          <p>Total recipes: {recipes.length}</p>
          <p>Selected recipes: {selectedRecipes.length}</p>
        </div>

        <div className={shell.card}>
          <h2>Select Recipes</h2>

          <div className={shell.checklist}>
            {recipes.map((r) => (
              <label key={r._id} className={shell.checkItem}>
                <input
                  type="checkbox"
                  checked={selected.includes(r._id)}
                  onChange={() => toggle(r._id)}
                />
                <span>{r.name}</span>
              </label>
            ))}
          </div>
        </div>

        <div className={shell.card}>
          <h2>Macro Comparison (per 100g)</h2>

          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={macroData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="protein" fill="#3ca661" />
              <Bar dataKey="carbs" fill="#3b78d8" />
              <Bar dataKey="fat" fill="#d9534f" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className={shell.card}>
          <h2>Price Comparison (per 100g)</h2>

          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={priceData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="price" fill="#6f55b8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className={shell.card}>
        <h2>Analysis (per 100g)</h2>

        <div className={shell.tableWrap}>
          <table className={shell.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Calories</th>
                <th>Carbs</th>
                <th>Fat</th>
                <th>Protein</th>
                <th>Price (kr)</th>
              </tr>
            </thead>

            <tbody>
              {selectedRecipes.map((r) => {
                const data = calculatePer100(r);
                if (!data) return null;

                return (
                  <tr key={r._id}>
                    <td>{r.name}</td>
                    <td>{data.calories.toFixed(1)}</td>
                    <td>{data.carbs.toFixed(1)}</td>
                    <td>{data.fat.toFixed(1)}</td>
                    <td>{data.protein.toFixed(1)}</td>
                    <td>{data.price.toFixed(2)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <p className={styles.note}>
          All values are recalculated per 100g directly from ingredients.
        </p>
      </div>
    </section>
  );
}

export default Statistics;
