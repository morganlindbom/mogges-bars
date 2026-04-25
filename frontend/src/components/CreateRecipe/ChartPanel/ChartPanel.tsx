// filename: src/components/CreateRecipe/ChartPanel/ChartPanel.tsx

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

type Per100 = {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  grams: number;
} | null;

type Props = {
  per100: Per100;
};

function ChartPanel({ per100 }: Props) {
  console.log("🔥 NEW CHART PANEL LOADED");

  if (!per100) return <p>No data</p>;

  const data = [
    { name: "Carbs", value: per100.carbs, color: "#F44336" },
    { name: "Protein", value: per100.protein, color: "#4CAF50" },
    { name: "Fat", value: per100.fat, color: "#2196F3" },
  ];

  return (
    <div>
      <h3>Macro Chart (per 100g)</h3>

      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />

          <Bar dataKey="value">
            {data.map((entry, index) => (
              <Cell key={index} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ChartPanel;