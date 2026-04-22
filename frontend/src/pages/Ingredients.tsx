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
 * Displays all ingredients in a table with edit and delete actions.
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

  /**
   * Delete ingredient.
   */
  async function handleDelete(id: string) {

    const confirmDelete = window.confirm("Are you sure you want to delete this ingredient?");

    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/ingredients/${id}`, {
        method: "DELETE"
      });

      if (!res.ok) {
        throw new Error("Failed to delete ingredient");
      }

      // Update UI directly
      setIngredients((prev) => prev.filter((ing) => ing._id !== id));

    } catch (err: any) {
      alert(err.message);
    }
  }

  if (loading) return <p>Loading ingredients...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <div>
      <h1>Ingredients</h1>

      <Link to="/ingredients/create">
        ➕ Add New Ingredient
      </Link>

      <br /><br />

      <table
        border={1}
        cellPadding={8}
        style={{ borderCollapse: "collapse", width: "100%" }}
      >
        <thead>
          <tr>
            <th>Name</th>
            <th>Calories (kcal)</th>
            <th>Protein (g)</th>
            <th>Carbs (g)</th>
            <th>Fat (g)</th>
            <th>Density</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {ingredients.map((ing) => (
            <tr key={ing._id}>
              <td>{ing.name}</td>
              <td>{ing.calories}</td>
              <td>{ing.protein}</td>
              <td>{ing.carbs}</td>
              <td>{ing.fat}</td>

              {/* Decimal formatting */}
              <td>{ing.density?.toFixed(2)}</td>

              {/* 🔥 ACTIONS */}
              <td>
                <Link to={`/ingredients/${ing._id}/edit`}>
                  ✏️ Edit
                </Link>

                {" | "}

                <button
                  onClick={() => handleDelete(ing._id)}
                  style={{ color: "red", cursor: "pointer" }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Ingredients;