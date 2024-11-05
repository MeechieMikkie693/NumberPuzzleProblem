import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./PuzzlePage.css";

const PuzzlePage3x3 = () => {
  // `initialGrid` stores the current state of the 3x3 puzzle
  const [initialGrid, setInitialGrid] = useState([]);

  // `goalGrid` is the final, solved state of the puzzle
  const goalGrid = Array.from({ length: 9 }, (_, i) => (i < 8 ? i + 1 : null));

  const location = useLocation(); // This hook retrieves the current location (and any passed state) from react-router
  const navigate = useNavigate(); // This hook allows navigation to other routes

  // Runs when the component mounts or the location state changes
  useEffect(() => {
    if (location.state?.selectedState) {
      // If a state was passed from the PuzzleHelp page, set it as the initial grid
      setInitialGrid(location.state.selectedState);
    } else {
      // Otherwise, shuffle a solved puzzle and use it as the initial grid
      const grid = Array.from({ length: 8 }, (_, i) => i + 1);
      grid.push(null); // Add `null` to represent the empty tile
      setInitialGrid(shuffleGrid(grid));
    }
  }, [location.state]);

  // Function to shuffle the grid randomly using the Fisher-Yates algorithm
  const shuffleGrid = (grid) => {
    for (let i = grid.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [grid[i], grid[j]] = [grid[j], grid[i]]; // Swap tiles at positions i and j
    }
    return grid;
  };

  // Function to reshuffle the grid when the user clicks "Try for Yourself"
  const handleTryAgain = () => {
    setInitialGrid(shuffleGrid([...initialGrid])); // Shuffles the current grid and sets the state
  };

  // Function to navigate to the PuzzleHelp page, passing the current grid as state
  const handleHelpClick = () => {
    navigate("/puzzle-help", { state: { initialGrid } });
  };

  // Function to handle tile movements when the user clicks on a tile
  const handleTileClick = (index) => {
    const emptyIndex = initialGrid.indexOf(null); // Find the index of the empty tile
    const validMoves = [
      emptyIndex - 1, // Left
      emptyIndex + 1, // Right
      emptyIndex - 3, // Up
      emptyIndex + 3, // Down
    ];

    // If the clicked tile is adjacent to the empty tile, swap them
    if (validMoves.includes(index)) {
      const newGrid = [...initialGrid]; // Copy the grid
      // Swap the empty tile and the clicked tile
      [newGrid[emptyIndex], newGrid[index]] = [
        newGrid[index],
        newGrid[emptyIndex],
      ];
      setInitialGrid(newGrid); // Update the grid state

      // Check if the new grid matches the goal grid (i.e., the puzzle is solved)
      if (JSON.stringify(newGrid) === JSON.stringify(goalGrid)) {
        // If solved, navigate to the Congratulations page
        navigate("/congratulations");
      }
    }
  };

  return (
    <div className="puzzle-page">
      <h1>3 x 3 Puzzle</h1>

      {/* Display the current grid (initial state) */}
      <h2>Initial State</h2>
      <div className="grid grid-3x3">
        {initialGrid.map((tile, index) => (
          <div
            key={index}
            className={`grid-item ${tile === null ? "empty" : ""}`}
            onClick={() => handleTileClick(index)} // Handle tile click to attempt movement
          >
            {tile !== null ? tile : ""}{" "}
            {/* Display tile number or empty if null */}
          </div>
        ))}
      </div>

      {/* Display the goal grid */}
      <h2>Goal State</h2>
      <div className="grid grid-3x3">
        {goalGrid.map((tile, index) => (
          <div
            key={index}
            className={`grid-item ${tile === null ? "empty" : ""}`}
          >
            {tile !== null ? tile : ""}{" "}
            {/* Display tile number or empty if null */}
          </div>
        ))}
      </div>

      {/* Buttons to reshuffle or navigate to help */}
      <div className="button-container">
        <button onClick={handleTryAgain}>Try for Yourself</button>{" "}
        {/* Shuffle the grid */}
        <button onClick={handleHelpClick}>Help</button> {/* Navigate to help */}
      </div>
    </div>
  );
};

export default PuzzlePage3x3;
