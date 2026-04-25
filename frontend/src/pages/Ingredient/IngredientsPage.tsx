// filename: src/pages/Ingredients/IngredientsPage.tsx

import { useEffect, useState } from "react";
import IngredientTable from "@/components/Ingredient/IngredientTable";
import IngredientForm from "@/components/Ingredient/IngredientForm";
import { getIngredients } from "@/services/ingredient.api";
import { Ingredient } from "@/types/Ingredient";
import shell from "@/pages/PageShell.module.css";
import styles from "./IngredientsPage.module.css";

export default function IngredientsPage() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchIngredients() {
    try {
      setLoading(true);
      const data = await getIngredients<Ingredient[]>();
      setIngredients(data);
      setError(null);
    } catch {
      setError("Failed to fetch ingredients");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchIngredients();
  }, []);

  if (loading) {
    return (
      <section className={shell.page}>
        <h1>Ingredients</h1>
        <p className={shell.muted}>Loading...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className={shell.page}>
        <h1>Ingredients</h1>
        <p className={shell.error}>{error}</p>
      </section>
    );
  }

  return (
    <section className={shell.page}>
      <h1>Ingredients</h1>

      <div className={shell.card}>
        <h2>Add Ingredient</h2>
        <IngredientForm onSuccess={fetchIngredients} />
      </div>

      <div className={`${shell.card} ${styles.tableCard}`}>
        <h2>Ingredient Library</h2>
        <IngredientTable
          ingredients={ingredients}
          onRefresh={fetchIngredients}
        />
      </div>
    </section>
  );
}
