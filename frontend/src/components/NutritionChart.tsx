// filename: src/components/NutritionChart.tsx

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

/**
 * Props type.
 */
type Props = {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
};

/**
 * NutritionChart component.
 *
 * Displays nutritional values as a responsive bar chart.
 */
function NutritionChart({ calories, protein, carbs, fat }: Props) {

  const data = [
    { name: "Calories", value: calories },
    { name: "Protein", value: protein },
    { name: "Carbs", value: carbs },
    { name: "Fat", value: fat }
  ];

  return (
    <div style={{ width: "100%", height: 300 }}>
      {/* 🔥 VIKTIGT: width + height */}
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default NutritionChart;