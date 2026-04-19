// filename: src/pages/Home.jsx

import { useEffect, useState } from "react";
import BarList from "@/components/BarList";

/**
 * Home page.
 *
 * Main container for UI components.
 */
function Home() {

  const [bars, setBars] = useState([]);

  useEffect(() => {
    async function loadBars() {
      try {
        const res = await fetch("/api/bars");

        if (!res.ok) {
          throw new Error("Failed to fetch bars");
        }

        const data = await res.json();
        setBars(data);

      } catch (error) {
        console.error(error);
      }
    }

    loadBars();
  }, []);

  return (
    <div>
      <h1>My Bars</h1>
      <BarList bars={bars} />
    </div>
  );
}

export default Home;