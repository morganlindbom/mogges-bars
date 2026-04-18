// filename: src/components/BarRow.jsx

/**
 * BarRow component.
 *
 * Displays a single bar item.
 */
function BarRow({ bar }) {

  /**
   * Render a single bar.
   *
   * Shows name and protein value.
   */
  return (
    <div>
      <p>{bar.name} - {bar.protein}g protein</p>
    </div>
  );
}

export default BarRow;