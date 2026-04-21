// filename: src/pages/Home.tsx

import { Link } from "react-router-dom";

/**
 * Home page.
 *
 * Provides introduction and navigation.
 */
function Home() {

  /**
   * Render homepage.
   */
  return (
    <div>
      <h1>My Homepage</h1>

      <p>
        This application allows you to create and manage custom nutrition bars.
        You can analyze nutritional values and build optimized recipes.
      </p>

      <nav>
        <ul>
          <li><Link to="/bars">View Bars</Link></li>
          <li><Link to="/bars/create">Create Bar</Link></li>
          <li><Link to="/ingredients">Ingredients</Link></li>
          <li><Link to="/stats">Statistics</Link></li>
        </ul>
      </nav>
    </div>
  );
}

export default Home;