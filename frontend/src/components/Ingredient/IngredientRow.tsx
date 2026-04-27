// filename: src/components/Ingredient/IngredientRow.tsx

import { Ingredient } from "@/types/Ingredient";
import { Link } from "react-router-dom";
import { deleteIngredient } from "@/services/ingredient.api";
import { useAuth } from "@/auth/useAuth";
import styles from "./IngredientRow.module.css";

type Props = Readonly<{
  ingredient: Ingredient;
  onRefresh: () => void;
}>;

export default function IngredientRow({ ingredient, onRefresh }: Props) {
  const { token } = useAuth();

  async function handleDelete() {
    // Ask user for confirmation before deleting
    const confirmed = window.confirm(
      `Are you sure you want to delete "${ingredient.name}"? This action cannot be undone.`,
    );

    if (!confirmed) return;

    try {
      await deleteIngredient(ingredient._id);
      onRefresh();
    } catch (err) {
      // Optionally show a user-visible error later
      console.error("Delete failed", err);
    }
  }

  return (
    <tr>
      <td>{ingredient.name}</td>
      <td>{ingredient.calories}</td>
      <td>{ingredient.protein}</td>
      <td>{ingredient.carbs}</td>
      <td>{ingredient.fat}</td>
      <td>{ingredient.pricePer1000g}</td>
      <td>
        {token ? (
          <div className={styles.actions}>
            <Link
              to={`/ingredients/${ingredient._id}/edit`}
              aria-label="Edit ingredient"
              className={`${styles.iconButton} ${styles.edit}`}
            >
              ✏️
            </Link>

            <button
              type="button"
              onClick={handleDelete}
              aria-label="Delete ingredient"
              className={`${styles.iconButton} ${styles.delete}`}
            >
              ❌
            </button>
          </div>
        ) : (
          "Login required"
        )}
      </td>
    </tr>
  );
}
