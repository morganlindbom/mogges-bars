// filename: src/components/Recipe/RecipeList.tsx

import { Recipe } from "@/types/Recipe";
import RecipeRow from "./RecipeRow";
import styles from "./RecipeList.module.css";

type Props = {
  recipes: Recipe[];
  onRefresh: () => void;
};

export default function RecipeList({ recipes, onRefresh }: Props) {
  if (recipes.length === 0) {
    return <p className={styles.muted}>No recipes found.</p>;
  }

  return (
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Calories</th>
            <th>Protein</th>
            <th>Carbs</th>
            <th>Fat</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {recipes.map((recipe) => (
            <RecipeRow key={recipe._id} recipe={recipe} onRefresh={onRefresh} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
