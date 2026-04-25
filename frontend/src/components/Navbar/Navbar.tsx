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
    return isActive ? `${styles.link} ${styles.active}` : styles.link;
  }

  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <NavLink to="/home" className={({ isActive }) => linkClass(isActive)}>
            Home
          </NavLink>
        </div>

        <div className={styles.center}>
          <NavLink to="/bars" className={({ isActive }) => linkClass(isActive)}>
            Bars
          </NavLink>

          <NavLink
            to="/shakes"
            className={({ isActive }) => linkClass(isActive)}
          >
            Shakes
          </NavLink>

          <NavLink
            to="/ingredients"
            className={({ isActive }) => linkClass(isActive)}
          >
            Ingredients
          </NavLink>

          <NavLink
            to="/recipes"
            className={({ isActive }) => linkClass(isActive)}
          >
            Recipes
          </NavLink>

          <NavLink
            to="/statistics"
            className={({ isActive }) => linkClass(isActive)}
          >
            Statistics
          </NavLink>

          <NavLink
            to="/compare"
            className={({ isActive }) => linkClass(isActive)}
          >
            Compare
          </NavLink>
        </div>

        <div className={styles.right}>
          {token ? (
            <button onClick={handleLogout} className={styles.logout}>
              Logout
            </button>
          ) : (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) => linkClass(isActive)}
              >
                Login
              </NavLink>

              <NavLink
                to="/register"
                className={({ isActive }) => linkClass(isActive)}
              >
                Register
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
