// filename: src/components/BarList.jsx

import BarRow from "@/components/BarRow";

/**
 * BarList component.
 *
 * Responsible for rendering a list of bars.
 */
function BarList() {

  /**
   * Temporary static data.
   *
   * This will later be replaced by API data from backend.
   */
  const bars = [
    { name: "Protein Bar", protein: 20 },
    { name: "Energy Bar", protein: 10 }
  ];

  /**
   * Render list of bars.
   *
   * Maps each bar object to a BarRow component.
   */
  return (
    <div>
      {bars.map((bar, index) => (
        <BarRow key={index} bar={bar} />
      ))}
    </div>
  );
}

export default BarList;