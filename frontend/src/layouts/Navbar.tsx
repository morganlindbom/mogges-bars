// filename: src/layout/Navbar/Navbar.tsx

import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";

/**
 * Navbar component.
 *
 * Shared navigation across all pages.
 */
function Navbar() {
  /**
   * Render navigation.
   *
   * Uses NavLink for automatic active state handling.
   */
  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        <NavLink
          to="/home"
          className={({ isActive }) =>
            isActive
              ? `${styles.link} ${styles.active}`
              : styles.link
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/bars"
          className={({ isActive }) =>
            isActive
              ? `${styles.link} ${styles.active}`
              : styles.link
          }
        >
          Bars
        </NavLink>

        <NavLink
          to="/ingredients"
          className={({ isActive }) =>
            isActive
              ? `${styles.link} ${styles.active}`
              : styles.link
          }
        >
          Ingredients
        </NavLink>

        <NavLink
          to="/stats"
          className={({ isActive }) =>
            isActive
              ? `${styles.link} ${styles.active}`
              : styles.link
          }
        >
          Stats
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;