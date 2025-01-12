import { icons } from "@/lib/bg-icons";

const generateUniquePositions = (count: number) => {
  const positions: { left: number; top: number }[] = [];
  const size = 5; // Grid cell size in vw
  const maxRows = Math.floor(100 / size); // Maximum number of rows
  const maxCols = Math.floor(100 / size); // Maximum number of columns

  while (positions.length < count) {
    const row = Math.floor(Math.random() * maxRows);
    const col = Math.floor(Math.random() * maxCols);
    const leftPosition = col * size; // Calculate left position based on column
    const topPosition = row * size; // Calculate top position based on row

    // Check for collision
    const collision = positions.some(
      (pos) => pos.left === leftPosition && pos.top === topPosition
    );

    if (!collision) {
      positions.push({ left: leftPosition, top: topPosition });
    }
  }

  return positions;
};

const renderIcons = () => {
  const positions = generateUniquePositions(50);
  return positions.map((pos, index) => {
    const Icon = icons[Math.floor(Math.random() * icons.length)];
    const size = Math.random() * 30 + 20; // Random size between 20 and 50px
    const rotation = Math.random() * 90 - 45; // Random rotation between -45 and +45 degrees

    return (
      <Icon
        key={index}
        className="absolute opacity-10 pointer-events-none"
        style={{
          left: `${pos.left}vw`,
          top: `${pos.top}vh`,
          fontSize: `${size}px`,
          transform: `rotate(${rotation}deg)`,
        }}
      />
    );
  });
};

export default renderIcons;
