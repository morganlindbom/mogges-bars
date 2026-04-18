// filename: src/pages/Home.jsx

import BarList from "@/components/BarList";

/**
 * Home page.
 *
 * Main container for UI components.
 */
function Home() {

  /**
   * Layout rendering.
   *
   * Displays page title and list of bars.
   */
  return (
    <div>
      <h1>My Bars</h1>
      <BarList />
    </div>
  );
}

export default Home;