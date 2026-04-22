// filename: src/components/create-bar/ChartPanel/ChartPanel.tsx

import NutritionChart from "@/components/NutritionChart";
import styles from "./ChartPanel.module.css";

/**
 * Props definition.
 */
type Props = {
  per100: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  } | null;
};

function ChartPanel({ per100 }: Props) {
  /**
   * Displays chart if data exists.
   *
   * Centers the chart and provides fallback UI.
   */
  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>Nutrition Chart</h3>

      <div className={styles.content}>
        {per100 ? (
          <NutritionChart
            calories={per100.calories}
            protein={per100.protein}
            carbs={per100.carbs}
            fat={per100.fat}
          />
        ) : (
          <p className={styles.empty}>
            Add ingredients to see chart
          </p>
        )}
      </div>
    </div>
  );
}

export default ChartPanel;