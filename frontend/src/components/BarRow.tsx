// filename: src/components/BarRow.tsx

import { BarRowProps } from "@/types/Bar";

/**
 * BarRow component.
 *
 * Displays a single bar item with calculated nutritional data.
 */
function BarRow({ bar, onDelete }: BarRowProps) {

  /**
   * Handle delete click.
   */
  function handleDelete() {
    console.log("DELETE CLICKED:", bar._id);
    onDelete(bar._id);
  }

  /**
   * Render a single bar.
   */
  return (
    <div style={{ border: "1px solid gray", padding: "10px", margin: "10px" }}>
      <h3>{bar.name}</h3>

      <p><strong>Calories: {bar.totalCalories?.toFixed(0)} kcal</strong></p>
      <br />

      <p>Carbs: {bar.totalCarbs?.toFixed(1)} g</p>
      <p>Fat: {bar.totalFat?.toFixed(1)} g</p>
      <p>Protein: {bar.totalProtein?.toFixed(1)} g</p>

      <hr />

      <h4>Ingredients:</h4>

      {bar.ingredients?.map((item, index) => (
        <p key={index}>
          {item.ingredientId?.name} — {item.grams}g
        </p>
      ))}

      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default BarRow;