// filename: src/pages/Bars.tsx

import { useEffect, useState } from "react";
import { getRecipes } from "@/services/recipe.api";
import RecipeList from "@/components/Recipe/RecipeList";
import { Recipe } from "@/types/Recipe";
import styles from "./Bars.module.css";

export default function Bars() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchBars() {
    try {
      setLoading(true);

      const bars = await getRecipes<Recipe[]>({ type: "bar" });

      setRecipes(bars);
      setError(null);
    } catch {
      setError("Failed to fetch bars");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchBars();

    const intervalId = globalThis.setInterval(() => {
      fetchBars();
    }, 30000);

    return () => {
      globalThis.clearInterval(intervalId);
    };
  }, []);

  if (loading) {
    return (
      <section className={styles.page}>
        <h1>Bars</h1>
        <p className={styles.muted}>Loading...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className={styles.page}>
        <h1>Bars</h1>
        <p className={styles.error}>{error}</p>
      </section>
    );
  }

  return (
    <section className={styles.page}>
      <h1>Bars</h1>

      <div className={styles.card}>
        <RecipeList recipes={recipes} onRefresh={fetchBars} />
      </div>
    </section>
  );
}
