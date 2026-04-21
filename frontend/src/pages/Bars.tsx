// filename: src/pages/Bars.tsx

import { useEffect, useState } from "react";
import BarList from "@/components/BarList";
import { Bar } from "@/types/Bar";
import { Link } from "react-router-dom";

/**
 * Bars page.
 *
 * Displays all bars and handles delete.
 */
function Bars() {
  const [bars, setBars] = useState<Bar[]>([]);

  /**
   * Fetch bars from API.
   */
  async function loadBars() {
    const res = await fetch("/api/bars");
    const data = await res.json();
    setBars(data);
  }

  useEffect(() => {
    loadBars();
  }, []);

  /**
   * Delete a bar.
   */
  async function handleDelete(id: string) {
    console.log("Deleting:", id);

    await fetch(`/api/bars/${id}`, {
      method: "DELETE",
    });

    // Update UI
    setBars((prev) => prev.filter((bar) => bar._id !== id));
  }

  return (
    <div>
      <h1>Bars</h1>
        <Link to="/bars/create">Create New Bar</Link>
      <BarList
        bars={bars}
        onDelete={handleDelete} // ✔ NU FINNS FUNKTIONEN
      />
    </div>
  );
}

export default Bars;
