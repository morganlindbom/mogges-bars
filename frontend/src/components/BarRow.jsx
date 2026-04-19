// filename: src/components/BarRow.jsx

import PropTypes from "prop-types";

/**
 * BarRow component.
 *
 * Displays a single bar item with full nutritional data.
 */
function BarRow({ bar }) {
  /**
   * Render a single bar.
   */
  return (
    <div style={{ border: "1px solid gray", padding: "10px", margin: "10px" }}>
      <h3>{bar.name}</h3>

      <p>Protein: {bar.protein} g</p>
      <p>Fat: {bar.fat} g</p>
      <p>Carbs: {bar.carbs} g</p>
      <p>Calories: {bar.calories} kcal</p>
      <p>Density: {bar.density}</p>
    </div>
  );
}

/**
 * Prop validation
 */
BarRow.propTypes = {
  bar: PropTypes.shape({
    name: PropTypes.string.isRequired,
    protein: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    calories: PropTypes.number.isRequired,
    density: PropTypes.number.isRequired,
  }).isRequired,
};

export default BarRow;