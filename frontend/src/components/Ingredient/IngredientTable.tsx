// filename: src/components/Ingredient/IngredientTable.tsx

import { Ingredient } from "@/types/Ingredient";
import IngredientRow from "./IngredientRow";
import styles from "./IngredientTable.module.css";

type Props = Readonly<{
  ingredients: Ingredient[];
  onRefresh: () => void;
}>;

export default function IngredientTable({ ingredients, onRefresh }: Props) {
  if (ingredients.length === 0) {
    return <p className={styles.muted}>No ingredients found.</p>;
  }

  return (
    <div className={styles.tableWrap}>
      <table className={`${styles.table} ${styles.compact}`}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Calories</th>
            <th>Protein</th>
            <th>Carbs</th>
            <th>Fat</th>
            <th>Price/1000g</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {ingredients.map((ingredient) => (
            <IngredientRow
              key={ingredient._id}
              ingredient={ingredient}
              onRefresh={onRefresh}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
