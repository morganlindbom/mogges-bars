// filename: src/pages/Ingredients/IngredientsPage.tsx

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import IngredientTable from "@/components/Ingredient/IngredientTable";
import { getIngredients } from "@/services/ingredient.api";
import { Ingredient } from "@/types/Ingredient";
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
      <section className={styles.page}>
        <h1>Ingredients</h1>
        <p className={styles.muted}>Loading...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className={styles.page}>
        <h1>Ingredients</h1>
        <p className={styles.error}>{error}</p>
      </section>
    );
  }

  return (
    <section className={styles.page}>
      <h1>Ingredients</h1>

      <div className={styles.card}>
        <h2>Manage Ingredients</h2>
        <div className={styles.actions}>
          <Link to="/ingredients/add" className={styles.primaryButton}>
            Add Ingredient
          </Link>
        </div>
      </div>

      <div className={`${styles.card} ${styles.tableCard}`}>
        <h2>Ingredient Library</h2>
        <IngredientTable
          ingredients={ingredients}
          onRefresh={fetchIngredients}
        />
      </div>
    </section>
  );
}
