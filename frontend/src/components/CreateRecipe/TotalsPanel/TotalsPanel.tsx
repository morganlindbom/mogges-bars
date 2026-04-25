// filename: src/components/CreateRecipe/TotalsPanel/TotalsPanel.tsx

import styles from "./TotalsPanel.module.css";

type SelectedItem = {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  grams: number;
};

type Props = Readonly<{
  items: SelectedItem[];
}>;

export default function TotalsPanel({ items }: Props) {
  if (!items || items.length === 0) {
    return <p className={styles.empty}>No data</p>;
  }

  const totals = items.reduce(
    (acc, item) => {
      const grams = Math.max(0, item?.grams || 0);
      const factor = grams / 100;

      acc.grams += grams;
      acc.calories += (item?.calories || 0) * factor;
      acc.protein += (item?.protein || 0) * factor;
      acc.carbs += (item?.carbs || 0) * factor;
      acc.fat += (item?.fat || 0) * factor;

      return acc;
    },
    { grams: 0, calories: 0, protein: 0, carbs: 0, fat: 0 },
  );

  const divisor = totals.grams > 0 ? totals.grams / 100 : 1;

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>Totals</h3>

      <div className={styles.section}>
        <div className={styles.row}>
          <span className={styles.label}>Total grams:</span>
          <span className={styles.value}>{totals.grams.toFixed(1)}</span>
        </div>

        <div className={styles.row}>
          <span className={styles.label}>Calories (total):</span>
          <span className={styles.value}>{totals.calories.toFixed(1)}</span>
        </div>

        <div className={styles.row}>
          <span className={styles.label}>Protein (total):</span>
          <span className={styles.value}>{totals.protein.toFixed(1)} g</span>
        </div>

        <div className={styles.row}>
          <span className={styles.label}>Carbs (total):</span>
          <span className={styles.value}>{totals.carbs.toFixed(1)} g</span>
        </div>

        <div className={styles.row}>
          <span className={styles.label}>Fat (total):</span>
          <span className={styles.value}>{totals.fat.toFixed(1)} g</span>
        </div>
      </div>

      <hr className={styles.divider} />

      <div className={styles.section}>
        <h4 className={styles.subtitle}>Per 100g</h4>

        <div className={styles.row}>
          <span className={styles.label}>Calories:</span>
          <span className={styles.value}>
            {(totals.calories / divisor).toFixed(1)}
          </span>
        </div>

        <div className={styles.row}>
          <span className={styles.label}>Protein:</span>
          <span className={styles.value}>
            {(totals.protein / divisor).toFixed(1)} g
          </span>
        </div>

        <div className={styles.row}>
          <span className={styles.label}>Carbs:</span>
          <span className={styles.value}>
            {(totals.carbs / divisor).toFixed(1)} g
          </span>
        </div>

        <div className={styles.row}>
          <span className={styles.label}>Fat:</span>
          <span className={styles.value}>
            {(totals.fat / divisor).toFixed(1)} g
          </span>
        </div>
      </div>
    </div>
  );
}
