// filename: src/pages/CreateBar.tsx

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type Ingredient = {
  _id: string;
  name: string;
};

function CreateBar() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [selected, setSelected] = useState<any[]>([]);

  /**
   * Load ingredients
   */
  useEffect(() => {
    async function load() {
      const res = await fetch("/api/ingredients");
      const data = await res.json();
      setIngredients(data);
    }

    load();
  }, []);

  /**
   * Add ingredient
   */
  function addIngredient(id: string) {
    setSelected([...selected, { ingredientId: id, grams: 0 }]);
  }

  /**
   * Update grams
   */
  function updateGrams(index: number, grams: number) {
    const copy = [...selected];
    copy[index].grams = grams;
    setSelected(copy);
  }

  /**
   * Submit
   */
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    await fetch("/api/bars", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        ingredients: selected
      })
    });

    navigate("/bars");
  }

  return (
    <div>
      <h1>Create Bar</h1>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Bar name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <h3>Ingredients</h3>

        {ingredients.map((ing) => (
          <div key={ing._id}>
            <button type="button" onClick={() => addIngredient(ing._id)}>
              Add {ing.name}
            </button>
          </div>
        ))}

        <h3>Selected</h3>

        {selected.map((item, index) => (
          <div key={index}>
            grams:
            <input
              type="number"
              onChange={(e) => updateGrams(index, Number(e.target.value))}
            />
          </div>
        ))}

        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default CreateBar;