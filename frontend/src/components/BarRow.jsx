// filename: src/components/BarRow.jsx

import PropTypes from "prop-types";

/**
 * BarRow component.
 *
 * Displays a single bar item.
 */
function BarRow({ bar }) {
  /**
   * Render a single bar.
   */
  return (
    <div>
      <p>
        {bar.name} - {bar.protein}g protein
      </p>
    </div>
  );
}

/**
 * Prop validation
 *
 * Ensures correct structure of incoming data.
 */
BarRow.propTypes = {
  bar: PropTypes.shape({
    name: PropTypes.string.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
};

export default BarRow;
