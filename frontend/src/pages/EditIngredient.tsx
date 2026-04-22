// filename: src/pages/EditIngredient.tsx

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

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
 * EditIngredient page.
 *
 * Allows updating an existing ingredient.
 */
function EditIngredient() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState<Ingredient | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Load ingredient data.
   */
  useEffect(() => {

    async function loadIngredient() {
      try {
        const res = await fetch(`/api/ingredients/${id}`);

        if (!res.ok) {
          throw new Error("Failed to fetch ingredient");
        }

        const data = await res.json();
        setForm(data);

      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      loadIngredient();
    }

  }, [id]);

  /**
   * Handle input change.
   */
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {

    if (!form) return;

    const { name, value, type } = e.target;

    setForm({
      ...form,
      [name]: type === "number"
        ? Number(value)
        : value
    });
  }

  /**
   * Submit update.
   */
  async function handleSubmit(e: React.FormEvent) {

    e.preventDefault();

    if (!form) return;

    try {
      const res = await fetch(`/api/ingredients/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      if (!res.ok) {
        throw new Error("Failed to update ingredient");
      }

      navigate("/ingredients");

    } catch (err: any) {
      setError(err.message);
    }
  }

  if (loading) return <p>Loading ingredient...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;
  if (!form) return <p>Ingredient not found</p>;

  return (
    <div>
      <h1>Edit Ingredient</h1>

      <form onSubmit={handleSubmit}>

        <input
          name="name"
          value={form.name}
          onChange={handleChange}
        />

        <input
          name="calories"
          type="number"
          value={form.calories}
          onChange={handleChange}
        />

        <input
          name="carbs"
          type="number"
          value={form.carbs}
          onChange={handleChange}
        />

        <input
          name="fat"
          type="number"
          value={form.fat}
          onChange={handleChange}
        />

        <input
          name="protein"
          type="number"
          value={form.protein}
          onChange={handleChange}
        />

        <input
          name="density"
          type="number"
          step="0.01"
          value={form.density}
          onChange={handleChange}
        />

        <br /><br />

        <button type="submit">
          Update Ingredient
        </button>

      </form>
    </div>
  );
}

export default EditIngredient;