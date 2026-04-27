// filename: src/pages/Home.tsx

import styles from "./Home.module.css";

/**
 * Home page.
 *
 * Displays overview of system features.
 */
function Home() {
  return (
    <div className={styles.wrapper}>

      {/* HERO */}
      <section className={styles.hero}>
        <h1 className={styles.title}>
          Mogges Nutrition Bar App
        </h1>

        <p className={styles.subtitle}>
          Build, analyze, and optimize your own nutrition bars.
          Control macros, experiment with ingredients, and create
          the perfect recipe.
        </p>
      </section>

      {/* GRID */}
      <section className={styles.grid}>

        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Add Ingredient</h3>
          <p className={styles.cardText}>
            Create and store new ingredients with nutritional values such as
            calories, protein, carbohydrates, and fat per 100g. This allows you
            to build accurate and reusable components for your recipes.
          </p>
        </div>

        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Create Bar</h3>
          <p className={styles.cardText}>
            Combine ingredients and define exact weights to construct a custom
            nutrition bar. The system automatically calculates total and per
            100g nutritional values.
          </p>
        </div>

        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Ingredients Overview</h3>
          <p className={styles.cardText}>
            View and manage all stored ingredients. Update nutritional data,
            remove outdated entries, and maintain a clean ingredient database.
          </p>
        </div>

        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Statistics</h3>
          <p className={styles.cardText}>
            Analyze nutritional distributions and compare different bar
            compositions using visual charts and aggregated data.
          </p>
        </div>

      </section>
    </div>
  );
}

export default Home;