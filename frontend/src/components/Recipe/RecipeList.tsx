// filename: src/components/Recipe/RecipeList.tsx

import { Recipe } from "@/types/Recipe";
import RecipeRow from "./RecipeRow";
import shell from "@/pages/PageShell.module.css";

type Props = {
  recipes: Recipe[];
  onRefresh: () => void;
};

export default function RecipeList({ recipes, onRefresh }: Props) {
  if (recipes.length === 0) {
    return <p className={shell.muted}>No recipes found.</p>;
  }

  return (
    <div className={shell.tableWrap}>
      <table className={shell.table}>
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
