// filename: src/pages/BarDetails.tsx

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Bar } from "@/types/Bar";

/**
 * BarDetails page.
 *
 * Displays a single bar.
 */
function BarDetails() {

  const { id } = useParams();
  const [bar, setBar] = useState<Bar | null>(null);

  useEffect(() => {
    async function loadBar() {
      const res = await fetch(`/api/bars/${id}`);
      const data = await res.json();
      setBar(data);
    }

    loadBar();
  }, [id]);

  if (!bar) return <p>Loading...</p>;

  return (
    <div>
      <h1>{bar.name}</h1>

      <p>Calories: {bar.calories}</p>
      <p>Protein: {bar.protein}</p>
      <p>Fat: {bar.fat}</p>
      <p>Carbs: {bar.carbs}</p>

      <Link to={`/bars/${bar._id}/edit`}>Edit</Link>
    </div>
  );
}

export default BarDetails;