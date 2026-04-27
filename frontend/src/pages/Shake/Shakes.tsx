// filename: src/pages/Shakes.tsx

import { useEffect, useState } from "react";
import { getRecipes } from "@/services/recipe.api";
import RecipeList from "@/components/Recipe/RecipeList";
import { Recipe } from "@/types/Recipe";
import styles from "./Shakes.module.css";

export default function Shakes() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchShakes() {
    try {
      setLoading(true);

      const shakes = await getRecipes<Recipe[]>({ type: "shake" });

      setRecipes(shakes);
      setError(null);
    } catch {
      setError("Failed to fetch shakes");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchShakes();
  }, []);

  if (loading) {
    return (
      <section className={styles.page}>
        <h1>Shakes</h1>
        <p className={styles.muted}>Loading...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className={styles.page}>
        <h1>Shakes</h1>
        <p className={styles.error}>{error}</p>
      </section>
    );
  }

  return (
    <section className={styles.page}>
      <h1>Shakes</h1>

      <div className={styles.card}>
        <RecipeList recipes={recipes} onRefresh={fetchShakes} />
      </div>
    </section>
  );
}
