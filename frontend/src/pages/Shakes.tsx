// filename: src/pages/Shakes.tsx

import { useEffect, useState } from "react";
import { getRecipes } from "@/services/recipe.api";
import RecipeList from "@/components/Recipe/RecipeList";
import { Recipe } from "@/types/Recipe";
import shell from "./PageShell.module.css";

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
      <section className={shell.page}>
        <h1>Shakes</h1>
        <p className={shell.muted}>Loading...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className={shell.page}>
        <h1>Shakes</h1>
        <p className={shell.error}>{error}</p>
      </section>
    );
  }

  return (
    <section className={shell.page}>
      <h1>Shakes</h1>

      <div className={shell.card}>
        <RecipeList recipes={recipes} onRefresh={fetchShakes} />
      </div>
    </section>
  );
}
