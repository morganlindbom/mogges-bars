// filename: src/pages/Ingredients.tsx

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
  density: number;
};

/**
 * Ingredients page.
 *
 * Displays all ingredients with navigation to create new ones.
 */
function Ingredients() {

  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetch ingredients from API.
   */
  async function loadIngredients() {
    try {
      const res = await fetch("/api/ingredients");

      if (!res.ok) {
        throw new Error("Failed to fetch ingredients");
      }

      const data: Ingredient[] = await res.json();
      setIngredients(data);

    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadIngredients();
  }, []);

  if (loading) return <p>Loading ingredients...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Ingredients</h1>

      {/* 🔥 Link to create ingredient */}
      <Link to="/Ingredients/Create/">
        ➕ Add New Ingredient
      </Link>

      <div style={{ marginTop: "20px" }}>
        {ingredients.map((ing) => (
          <div
            key={ing._id}
            style={{
              border: "1px solid gray",
              padding: "10px",
              marginBottom: "10px"
            }}
          >
            <h3>{ing.name}</h3>

            <p><strong>Calories: {ing.calories} kcal</strong></p>
            <p>Protein: {ing.protein} g</p>
            <p>Carbs: {ing.carbs} g</p>
            <p>Fat: {ing.fat} g</p>

            <p>Density: {ing.density}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Ingredients;