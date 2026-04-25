// filename: src/pages/Statistics.tsx

import { useEffect, useState } from "react";
import { Recipe } from "@/types/Recipe";
import styles from "./Statistics.module.css";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

/**
 * Statistics page.
 *
 * All analysis is recalculated per 100g from ingredients.
 */
function Statistics() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [ingredients, setIngredients] = useState<any[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const r = await fetch("/api/recipes");
      const i = await fetch("/api/ingredients");

      setRecipes(await r.json());
      setIngredients(await i.json());
      setLoading(false);
    }

    load();
  }, []);

  function toggle(id: string) {
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id]
    );
  }

  /**
   * 🔥 TRUE calculation per 100g
   */
  function calculatePer100(recipe: Recipe) {
    let totals = {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
      grams: 0,
      price: 0,
    };

    recipe.ingredients.forEach((item) => {
      const ing = ingredients.find(i => i._id === item.ingredientId);
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

  const selectedRecipes = recipes.filter((r) =>
    selected.includes(r._id)
  );

  const macroData = selectedRecipes.map((r) => {
    const data = calculatePer100(r);
    return {
      name: r.name,
      protein: data?.protein || 0,
      carbs: data?.carbs || 0,
      fat: data?.fat || 0
    };
  });

  const priceData = selectedRecipes.map((r) => {
    const data = calculatePer100(r);
    return {
      name: r.name,
      price: data?.price || 0
    };
  });

  if (loading) return <p>Loading...</p>;

  return (
    <div className={styles.container}>

      {/* PANEL 1 */}
      <div className={styles.panel}>
        <div className={styles.title}>Overview</div>
        <p>Total recipes: {recipes.length}</p>
      </div>

      {/* PANEL 2 */}
      <div className={styles.panel}>
        <div className={styles.title}>Select Recipes</div>

        {recipes.map((r) => (
          <div key={r._id}>
            <label>
              <input
                type="checkbox"
                checked={selected.includes(r._id)}
                onChange={() => toggle(r._id)}
              />
              {r.name}
            </label>
          </div>
        ))}
      </div>

      {/* PANEL 3 */}
      <div className={styles.panel}>
        <div className={styles.title}>Macro Comparison (per 100g)</div>

        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={macroData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />

            {/* 🔥 FIXED COLORS */}
            <Bar dataKey="protein" fill="#4CAF50" /> {/* Green */}
            <Bar dataKey="carbs" fill="#2196F3" />   {/* Blue */}
            <Bar dataKey="fat" fill="#F44336" />     {/* Red */}

          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* PANEL 4 */}
      <div className={styles.panel}>
        <div className={styles.title}>Price Comparison (per 100g)</div>

        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={priceData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />

            {/* 🔥 PRICE COLOR */}
            <Bar dataKey="price" fill="purple" /> {/* Purple */}
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* ANALYSIS */}
      <div style={{ gridColumn: "1 / span 2" }}>
        <h2>Analysis (per 100g)</h2>

        <table style={{ width: "100%", borderCollapse: "collapse" }}>
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

        <p style={{ marginTop: "10px" }}>
          All values are recalculated per 100g directly from ingredients.
        </p>
      </div>

    </div>
  );
}

export default Statistics;