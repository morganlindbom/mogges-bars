// filename: src/components/create-bar/TotalsPanel/TotalsPanel.tsx

import styles from "./TotalsPanel.module.css";

/**
 * Totals structure.
 */
type Totals = {
  grams: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
};

/**
 * Props definition.
 */
type Props = {
  totals: Totals;
  per100: Totals | null;
};

function TotalsPanel({ totals, per100 }: Props) {
  /**
   * Displays total nutritional values and per 100g values.
   *
   * Uses structured rows for better readability.
   */
  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>Totals</h3>

      {/* TOTAL VALUES */}
      <div className={styles.section}>
        <div className={styles.row}>
          <span className={styles.label}>Weight</span>
          <span className={styles.value}>{totals.grams.toFixed(0)} g</span>
        </div>

        <div className={styles.row}>
          <span className={styles.label}>Calories</span>
          <span className={styles.value}>{totals.calories.toFixed(0)}</span>
        </div>

        <div className={styles.row}>
          <span className={styles.label}>Protein</span>
          <span className={styles.value}>{totals.protein.toFixed(1)} g</span>
        </div>

        <div className={styles.row}>
          <span className={styles.label}>Carbs</span>
          <span className={styles.value}>{totals.carbs.toFixed(1)} g</span>
        </div>

        <div className={styles.row}>
          <span className={styles.label}>Fat</span>
          <span className={styles.value}>{totals.fat.toFixed(1)} g</span>
        </div>
      </div>

      <hr className={styles.divider} />

      {/* PER 100g */}
      <h4 className={styles.subtitle}>Per 100g</h4>

      {per100 ? (
        <div className={styles.section}>
          <div className={styles.row}>
            <span className={styles.label}>Calories</span>
            <span className={styles.value}>{per100.calories.toFixed(0)}</span>
          </div>

          <div className={styles.row}>
            <span className={styles.label}>Protein</span>
            <span className={styles.value}>{per100.protein.toFixed(1)} g</span>
          </div>

          <div className={styles.row}>
            <span className={styles.label}>Carbs</span>
            <span className={styles.value}>{per100.carbs.toFixed(1)} g</span>
          </div>

          <div className={styles.row}>
            <span className={styles.label}>Fat</span>
            <span className={styles.value}>{per100.fat.toFixed(1)} g</span>
          </div>
        </div>
      ) : (
        <p className={styles.empty}>No data yet</p>
      )}
    </div>
  );
}

export default TotalsPanel;