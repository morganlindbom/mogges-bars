// filename: src/components/BarList.jsx

import BarRow from "@/components/BarRow";

/**
 * BarList component.
 *
 * Renders list of bars from props.
 */
function BarList({ bars }) {

  /**
   * Render bars.
   */
  return (
    <div>
      {bars.map((bar) => (
        <BarRow key={bar._id} bar={bar} />
      ))}
    </div>
  );
}

export default BarList;