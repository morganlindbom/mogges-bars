// filename: src/components/BarList.jsx

import BarRow from "@/components/BarRow";

/**
 * BarList component.
 *
 * Receives list of bars via props and renders them.
 */
function BarList({ bars }) {

  /**
   * Render list of bars.
   */
  return (
    <div>
      {bars.map((bar) => (
        <BarRow key={bar.id} bar={bar} />
      ))}
    </div>
  );
}

export default BarList;
