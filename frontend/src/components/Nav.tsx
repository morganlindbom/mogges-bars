// filename: src/components/Nav.tsx

import { NavLink } from "react-router-dom";

/**
 * Navbar component.
 *
 * Shared navigation across all pages.
 */
function Navbar() {

  /**
   * Helper for active link styling.
   *
   * Highlights the current route.
   */
  const linkStyle = ({ isActive }: { isActive: boolean }) => ({
    marginRight: "50px",
    textDecoration: "none",
    fontWeight: isActive ? "bold" : "normal",
    color: isActive ? "blue" : "black"
  });

  /**
   * Render navigation.
   */
  return (
    <nav style={{ padding: "10px", background: "#eee" }}>
      <NavLink to="/home" style={linkStyle}>Home</NavLink>
      <NavLink to="/bars" style={linkStyle}>Bars</NavLink>
      <NavLink to="/ingredients" style={linkStyle}>Ingredients</NavLink>
      <NavLink to="/stats" style={linkStyle}>Stats</NavLink>
    </nav>
  );
}

export default Navbar;