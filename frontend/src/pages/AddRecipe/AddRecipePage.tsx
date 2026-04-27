import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRecipeById } from "@/services/recipe.api";

export default function AddRecipePage() {
/* Recipe edit page.

   Detailed explanation:
   - Loads recipe using recipe API
   - Not ingredient API
*/

  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
/* Load recipe */

    if (!id) return;

    async function load() {
      try {
        const data = await getRecipeById(id);
        setRecipe(data);
      } catch {
        setError("Failed to load recipe");
      }
    }

    load();
  }, [id]);

  if (error) return <p>{error}</p>;
  if (!recipe) return <p>Loading...</p>;

  return (
    <section>
      <h1>Edit Recipe</h1>
      <p>Name: {recipe.name}</p>
    </section>
  );
}