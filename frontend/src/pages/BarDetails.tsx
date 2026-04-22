// filename: src/pages/BarDetails.tsx

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Bar } from "@/types/Bar";

/**
 * BarDetails page.
 *
 * Displays a single bar with calculated nutrition
 * and its related ingredients.
 */
function BarDetails() {

  const { id } = useParams();
  const [bar, setBar] = useState<Bar | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetch a single bar from API.
   */
  useEffect(() => {

    async function loadBar() {
      try {
        const res = await fetch(`/api/bars/${id}`);

        if (!res.ok) {
          throw new Error("Failed to fetch bar");
        }

        const data: Bar = await res.json();
        setBar(data);

      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      loadBar();
    }

  }, [id]);

  if (loading) return <p>Loading bar...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;
  if (!bar) return <p>Bar not found</p>;

  return (
    <div>
      <h1>{bar.name}</h1>

      <h3>Nutrition (calculated)</h3>

      <p><strong>Calories: {bar.totalCalories?.toFixed(0)} kcal</strong></p>
      <p>Protein: {bar.totalProtein?.toFixed(1)} g</p>
      <p>Fat: {bar.totalFat?.toFixed(1)} g</p>
      <p>Carbs: {bar.totalCarbs?.toFixed(1)} g</p>

      <hr />

      <h3>Ingredients</h3>

      {bar.ingredients && bar.ingredients.length > 0 ? (
        bar.ingredients.map((item, index) => (
          <div key={index} style={{ marginBottom: "10px" }}>
            <strong>{item.ingredientId?.name}</strong>
            <p>{item.grams} g</p>
          </div>
        ))
      ) : (
        <p>No ingredients added</p>
      )}

      <hr />

      <Link to={`/bars/${bar._id}/edit`}>
        ✏️ Edit Bar
      </Link>
    </div>
  );
}

export default BarDetails;