// filename: src/components/create-bar/SelectedPanel/SelectedPanel.tsx

import styles from "./SelectedPanel.module.css";

/**
 * Selected ingredient structure.
 */
type SelectedIngredient = {
  ingredientId: string;
  name: string;
  grams: number;
};

/**
 * Props definition.
 */
type Props = {
  selected: SelectedIngredient[];
  onUpdate: (index: number, value: string) => void;
  onRemove: (index: number) => void;
};

function SelectedPanel({ selected, onUpdate, onRemove }: Props) {
  /**
   * Displays selected ingredients in a structured table.
   *
   * Allows editing of grams and removal.
   */
  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>Selected Ingredients</h3>

      {selected.length === 0 ? (
        <p className={styles.empty}>No ingredients selected</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.th}>Name</th>
              <th className={styles.th}>Grams</th>
              <th className={styles.th}></th>
            </tr>
          </thead>

          <tbody>
            {selected.map((item, index) => (
              <tr key={item.ingredientId}>
                <td className={styles.td}>{item.name}</td>

                <td className={styles.td}>
                  <input
                    className={styles.input}
                    type="text"
                    value={item.grams}
                    onChange={(e) =>
                      onUpdate(index, e.target.value)
                    }
                  />{" "}
                  g
                </td>

                <td className={styles.td}>
                  <button
                    className={styles.button}
                    onClick={() => onRemove(index)}
                  >
                    ❌
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default SelectedPanel;