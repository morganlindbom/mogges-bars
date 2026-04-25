// filename: src/components/CreateRecipe/ChartPanel/ChartPanel.tsx

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import styles from "./ChartPanel.module.css";

type SelectedItem = {
  protein: number;
  carbs: number;
  fat: number;
  grams: number;
};

type Props = Readonly<{
  items: SelectedItem[];
}>;

function ChartPanel({ items }: Props) {
  if (!items || items.length === 0) {
    return (
      <div className={styles.wrapper}>
        <h3 className={styles.title}>Macro Chart (per 100g)</h3>
        <p className={styles.empty}>No data</p>
      </div>
    );
  }

  const totals = items.reduce(
    (acc, item) => {
      const grams = Math.max(0, item.grams || 0);
      const factor = grams / 100;

      acc.grams += grams;
      acc.protein += (item.protein || 0) * factor;
      acc.carbs += (item.carbs || 0) * factor;
      acc.fat += (item.fat || 0) * factor;

      return acc;
    },
    { protein: 0, carbs: 0, fat: 0, grams: 0 },
  );

  const divisor = totals.grams > 0 ? totals.grams / 100 : 1;

  const data = [
    { name: "Carbs", value: totals.carbs / divisor, color: "#d9534f" },
    { name: "Protein", value: totals.protein / divisor, color: "#3ca661" },
    { name: "Fat", value: totals.fat / divisor, color: "#3b78d8" },
  ];

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>Macro Chart (per 100g)</h3>

      <div className={styles.content}>
        <ResponsiveContainer width="100%" height={230}>
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#3b78d8" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default ChartPanel;
