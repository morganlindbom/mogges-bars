// filename: src/layout/Navbar/Navbar.tsx

import { NavLink } from "react-router-dom";
import { useAuth } from "@/auth/useAuth";
import styles from "./Navbar.module.css";

/**
 * Navbar component.
 *
 * Shared navigation across all pages.
 * Displays navigation links and authentication actions.
 */
function Navbar() {

  const { token, logout } = useAuth();

  /**
   * Handle logout.
   */
  function handleLogout() {
    logout();
  }

  /**
   * Helper for NavLink class.
   */
  function linkClass(isActive: boolean) {
    return isActive
      ? `${styles.link} ${styles.active}`
      : styles.link;
  }

  return (
    <nav className={styles.nav}>

      <div className={styles.inner}>

        {/* LEFT SIDE */}
        <div className={styles.left}>

          <NavLink to="/home" className={({ isActive }) => linkClass(isActive)}>
            Home
          </NavLink>

        </div>
        {/* CENTER */}
        < div className={styles.center}>

          <NavLink to="/bars" className={({ isActive }) => linkClass(isActive)}>
            Bars
          </NavLink>

          <NavLink to="/shakes" className={({ isActive }) => linkClass(isActive)}>
            shake
          </NavLink>

          <NavLink to="/ingredients" className={({ isActive }) => linkClass(isActive)}>
            Ingredients
          </NavLink>

          <NavLink to="/recipes" className={({ isActive }) => linkClass(isActive)}>
            Recipes
          </NavLink>

          <NavLink to="/statistics" className={({ isActive }) => linkClass(isActive)}>
            Statistics
          </NavLink>

        </div>

        {/* RIGHT SIDE */}
        <div className={styles.right}>

          {!token ? (
            <NavLink to="/login" className={({ isActive }) => linkClass(isActive)}>
              Login
            </NavLink>
          ) : (
            <button onClick={handleLogout} className={styles.logout}>
              Logout
            </button>
          )}

        </div>

      </div>

    </nav>
  );
}

export default Navbar;