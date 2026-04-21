// filename: src/pages/Stats.tsx

import { useEffect, useState } from "react";

/**
 * Stats page.
 */
function Stats() {

  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/stats");
      const data = await res.json();
      setStats(data);
    }

    load();
  }, []);

  if (!stats) return <p>Loading stats...</p>;

  return (
    <div>
      <h1>Statistics</h1>

      <p>Average Calories: {stats.avgCalories}</p>
    </div>
  );
}

export default Stats;