// filename: src/pages/Bars.tsx

import { useEffect, useState } from "react";
import { getRecipes } from "@/services/recipe.api";
import RecipeList from "@/components/Recipe/RecipeList";
import { Recipe } from "@/types/Recipe";
import shell from "./PageShell.module.css";

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
  }, []);

  if (loading) {
    return (
      <section className={shell.page}>
        <h1>Bars</h1>
        <p className={shell.muted}>Loading...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className={shell.page}>
        <h1>Bars</h1>
        <p className={shell.error}>{error}</p>
      </section>
    );
  }

  return (
    <section className={shell.page}>
      <h1>Bars</h1>

      <div className={shell.card}>
        <RecipeList recipes={recipes} onRefresh={fetchBars} />
      </div>
    </section>
  );
}
