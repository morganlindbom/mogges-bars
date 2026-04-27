// filename: src/components/create-bar/SelectedPanel/SelectedPanel.tsx

import styles from "./SelectedPanel.module.css";
import { SelectedIngredient } from "@/types/SelectedIngredient";

type Props = Readonly<{
  items: SelectedIngredient[];
  onChange: (items: SelectedIngredient[]) => void;
}>;

function SelectedPanel({ items, onChange }: Props) {
  /* Selected panel.

   Detailed explanation:
   - Uses ONLY SelectedIngredient
*/

  function handleChange(index: number, value: number) {
    const updated = items.map((item, i) =>
      i === index ? { ...item, grams: value } : item,
    );

    onChange(updated);
  }

  function handleRemove(index: number) {
    const updated = items.filter((_, i) => i !== index);
    onChange(updated);
  }

  if (items.length === 0) {
    return <p className={styles.empty}>No ingredients selected</p>;
  }

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>Selected</h3>

      <table className={styles.table}>
        <tbody>
          {items.map((item, index) => (
            <tr key={`${item.ingredientId}-${index}`}>
              <td>{item.name}</td>

              <td>
                <div className={styles.gramInput}>
                  <input
                    className={styles.input}
                    type="text"
                    aria-label={`Grams for ${item.name}`}
                    value={item.grams}
                    onChange={(e) => {
                      const value = e.target.value;

                      // allow empty input (important for UX)
                      if (value === "") {
                        handleChange(index, 0);
                        return;
                      }

                      // convert to number safely
                      const parsed = Number(value);

                      // only update if valid number
                      if (!Number.isNaN(parsed)) {
                        handleChange(index, parsed);
                      }
                    }}
                  />
                  <span>gram</span>
                </div>
              </td>

              <td>
                <button onClick={() => handleRemove(index)}>❌</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SelectedPanel;
