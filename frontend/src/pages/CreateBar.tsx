// filename: src/pages/CreateBar.tsx

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import IngredientsPanel from "@/components/create-bar/IngredientsPanel/IngredientsPanel";
import SelectedPanel from "@/components/create-bar/SelectedPanel/SelectedPanel";
import TotalsPanel from "@/components/create-bar/TotalsPanel/TotalsPanel";
import ChartPanel from "@/components/create-bar/ChartPanel/ChartPanel";

/**
 * Ingredient type definition.
 */
type Ingredient = {
  _id: string;
  name: string;
  calories: number;
  carbs: number;
  fat: number;
  protein: number;
};

/**
 * Selected ingredient structure.
 */
type SelectedIngredient = {
  ingredientId: string;
  name: string;
  grams: number;
};

/**
 * Shared box styling
 */
const boxStyle: React.CSSProperties = {
  border: "1px solid #ccc",
  padding: "10px",
  borderRadius: "8px",
  overflowY: "auto",
};

function CreateBar() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [selected, setSelected] = useState<SelectedIngredient[]>([]);

  /**
   * Load ingredients
   */
  useEffect(() => {
    async function load() {
      const res = await fetch("/api/ingredients");
      const data = await res.json();
      setIngredients(data);
    }
    load();
  }, []);

  /**
   * Add ingredient
   */
  function addIngredient(ing: Ingredient) {
    setSelected((prev) => {
      if (prev.some((i) => i.ingredientId === ing._id)) return prev;

      return [...prev, { ingredientId: ing._id, name: ing.name, grams: 0 }];
    });
  }

  /**
   * Update grams
   */
  function updateGrams(index: number, value: string) {
    const grams = Number(value) || 0;

    setSelected((prev) =>
      prev.map((item, i) => (i === index ? { ...item, grams } : item)),
    );
  }

  /**
   * Remove ingredient
   */
  function removeIngredient(index: number) {
    setSelected((prev) => prev.filter((_, i) => i !== index));
  }

  /**
   * Calculate totals
   */
  const totals = selected.reduce(
    (acc, item) => {
      const ing = ingredients.find((i) => i._id === item.ingredientId);
      if (!ing) return acc;

      const factor = item.grams / 100;

      acc.calories += ing.calories * factor;
      acc.protein += ing.protein * factor;
      acc.carbs += ing.carbs * factor;
      acc.fat += ing.fat * factor;
      acc.grams += item.grams;

      return acc;
    },
    { calories: 0, protein: 0, carbs: 0, fat: 0, grams: 0 },
  );

  /**
   * Per 100g calculation
   */
  const per100 =
    totals.grams > 0
      ? {
          calories: (totals.calories / totals.grams) * 100,
          protein: (totals.protein / totals.grams) * 100,
          carbs: (totals.carbs / totals.grams) * 100,
          fat: (totals.fat / totals.grams) * 100,
          grams: 100,
        }
      : null;

  /**
   * Submit bar
   */
  async function handleSubmit() {
    await fetch("/api/bars", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        ingredients: selected.map((i) => ({
          ingredientId: i.ingredientId,
          grams: i.grams,
        })),
      }),
    });

    navigate("/bars");
  }

  return (
    <div style={{ padding: "5px" }}>
      {/* HEADER */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h1 style={{ margin: 0 }}>Create Bar</h1>

        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <label htmlFor="barName">Name:</label>

          <input
            id="barName"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <button onClick={handleSubmit}>Create</button>
        </div>
      </div>

      {/* 2x2 GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gridTemplateRows: "1fr 1fr",
          gap: "10px",
          height: "80vh",
        }}
      >
        {/* INGREDIENTS */}
        <div style={boxStyle}>
          <IngredientsPanel ingredients={ingredients} onAdd={addIngredient} />
        </div>

        {/* SELECTED */}
        <div style={boxStyle}>
          <SelectedPanel
            selected={selected}
            onUpdate={updateGrams}
            onRemove={removeIngredient}
          />
        </div>

        {/* TOTALS */}
        <div style={boxStyle}>
          <TotalsPanel totals={totals} per100={per100} />
        </div>

        {/* CHART */}
        <div style={boxStyle}>
          <ChartPanel per100={per100} />
        </div>
      </div>
    </div>
  );
}

export default CreateBar;
