// filename: src/components/BarList.tsx

import BarRow from "@/components/BarRow";
import { Bar, BarListProps } from "@/types/Bar";

/**
 * BarList component.
 *
 * Renders list of bars.
 */
function BarList({ bars, onDelete }: BarListProps) {

  return (
    <div>
      {bars.map((bar) => (
        <BarRow
          key={bar._id}
          bar={bar}
          onDelete={onDelete}   // 🔥 DENNA SAKNAS HOS DIG
        />
      ))}
    </div>
  );
}

export default BarList;