// filename: src/components/BarList.jsx

import BarRow from "@/components/BarRow";

function BarList() {
  const bars = [
    { id: 1, name: "Protein Bar", protein: 20 },
    { id: 2, name: "Energy Bar", protein: 10 },
  ];

  return (
    <div>
      {bars.map((bar) => (
        <BarRow key={bar.id} bar={bar} />
      ))}
    </div>
  );
}

export default BarList;
