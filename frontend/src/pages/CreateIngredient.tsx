// filename: src/pages/CreateIngredient.tsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 * CreateIngredient page.
 *
 * Provides a form to create a new ingredient.
 * Nutritional values are defined per 100g.
 */
function CreateIngredient() {

  const navigate = useNavigate();

  /**
   * Form state.
   *
   * Holds all input values for the ingredient.
   */
  const [form, setForm] = useState({
    name: "",
    calories: 0,
    carbs: 0,
    fat: 0,
    protein: 0,
    density: 1
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  /**
   * Handle input change.
   *
   * Updates form state dynamically based on input name.
   */
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {

    const { name, value, type } = e.target;

    setForm({
      ...form,
      [name]: type === "number"
        ? Number(value)
        : value
    });
  }

  /**
   * Handle form submit.
   *
   * Sends POST request to backend and redirects on success.
   */
  async function handleSubmit(e: React.FormEvent) {

    e.preventDefault();

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/ingredients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      if (!res.ok) {
        throw new Error("Failed to create ingredient");
      }

      // Redirect after success
      navigate("/ingredients");

    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  /**
   * Render form UI.
   */
  return (
    <div>
      <h1>Create Ingredient</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>

        <input
          name="name"
          placeholder="Name"
          onChange={handleChange}
          required
        />

        <input
          name="calories"
          type="number"
          placeholder="Calories (per 100g)"
          onChange={handleChange}
        />

        <input
          name="carbs"
          type="number"
          placeholder="Carbs (per 100g)"
          onChange={handleChange}
        />

        <input
          name="fat"
          type="number"
          placeholder="Fat (per 100g)"
          onChange={handleChange}
        />

        <input
          name="protein"
          type="number"
          placeholder="Protein (per 100g)"
          onChange={handleChange}
        />

        <input
          name="density"
          type="number"
          placeholder="Density"
          onChange={handleChange}
        />

        <br /><br />

        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Ingredient"}
        </button>

      </form>
    </div>
  );
}

export default CreateIngredient;