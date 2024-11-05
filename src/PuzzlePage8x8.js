import React, { useState, useEffect } from "react";
import "./PuzzlePage.css";

const PuzzlePage8x8 = () => {
  const [initialGrid, setInitialGrid] = useState([]);
  const goalGrid = Array.from({ length: 64 }, (_, i) =>
    i < 63 ? i + 1 : null
  );

  useEffect(() => {
    const grid = Array.from({ length: 63 }, (_, i) => i + 1);
    grid.push(null);
    setInitialGrid(shuffleGrid(grid));
  }, []);

  const shuffleGrid = (grid) => {
    for (let i = grid.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [grid[i], grid[j]] = [grid[j], grid[i]];
    }
    return grid;
  };

  const handleTryAgain = () => {
    const newGrid = shuffleGrid([...initialGrid]);
    setInitialGrid(newGrid);
  };

  return (
    <div className="puzzle-page">
      <h1>8 x 8 Puzzle</h1>

      <h2>Initial State</h2>
      <div className="grid grid-8x8">
        {initialGrid.map((tile, index) => (
          <div
            key={index}
            className={`grid-item ${tile === null ? "empty" : ""}`}
          >
            {tile !== null ? tile : ""}
          </div>
        ))}
      </div>

      <h2>Goal State</h2>
      <div className="grid grid-8x8">
        {goalGrid.map((tile, index) => (
          <div
            key={index}
            className={`grid-item ${tile === null ? "empty" : ""}`}
          >
            {tile !== null ? tile : ""}
          </div>
        ))}
      </div>

      <div className="button-container">
        <button onClick={handleTryAgain}>Try for Yourself</button>
        <button onClick={() => alert("Help button clicked")}>Help</button>
      </div>
    </div>
  );
};

export default PuzzlePage8x8;
