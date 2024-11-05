import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// Component that provides help for the puzzle by calculating and displaying next possible states
const PuzzleHelp = () => {
  // Getting the initial state of the puzzle from the location (passed from the previous page)
  const location = useLocation();
  const navigate = useNavigate();
  const { initialGrid } = location.state || {}; // Extracting the initial grid from location.state

  const [nextStates, setNextStates] = useState([]); // Holds the generated possible next states
  const [minHeuristic, setMinHeuristic] = useState(Infinity); // Keeps track of the minimum heuristic value

  // useEffect runs on component mount and every time the initialGrid changes
  useEffect(() => {
    // Define the goal state, which is the solved version of the 3x3 puzzle
    const goalGrid = Array.from(
      { length: 9 },
      (_, i) => (i < 8 ? i + 1 : null) // The goal state is [1, 2, 3, 4, 5, 6, 7, 8, null]
    );

    // Heuristic function that calculates the number of misplaced tiles
    const calculateHeuristic = (grid) => {
      return grid.reduce(
        (acc, tile, idx) =>
          tile !== goalGrid[idx] && tile !== null ? acc + 1 : acc, // Increment for each tile that's in the wrong position
        0
      );
    };

    // Function to generate valid next states from the current grid
    // It moves the blank space (null) and calculates heuristics for the resulting grids
    const generateNextStates = (grid, parentGrid) => {
      const emptyIndex = grid.indexOf(null); // Find the index of the blank space (null)
      const validMoves = []; // List to store valid next states
      const moveOffsets = [-1, 1, -3, 3]; // These offsets represent possible moves (left, right, up, down)

      moveOffsets.forEach((offset) => {
        const newIndex = emptyIndex + offset; // Calculate the new index after the move
        if (newIndex >= 0 && newIndex < grid.length) {
          // Ensure the move is within bounds of the grid
          if (
            (offset === -1 && emptyIndex % 3 === 0) || // Avoid invalid moves (like moving left from the leftmost column)
            (offset === 1 && emptyIndex % 3 === 2) // Avoid invalid moves (like moving right from the rightmost column)
          ) {
            return;
          }
          // Create a new grid by swapping the blank space with the adjacent tile
          const newGrid = [...grid];
          [newGrid[emptyIndex], newGrid[newIndex]] = [
            newGrid[newIndex],
            newGrid[emptyIndex],
          ];

          // Prevent generating the same state as the parent state (to avoid backtracking)
          if (JSON.stringify(newGrid) !== JSON.stringify(parentGrid)) {
            const heuristic = calculateHeuristic(newGrid); // Calculate the heuristic for the new state
            validMoves.push({
              state: newGrid, // Store the new state and its heuristic
              heuristic,
            });
          }
        }
      });

      return validMoves; // Return the list of valid next states
    };

    // If there's an initial grid available
    if (initialGrid) {
      const generatedStates = generateNextStates(initialGrid, initialGrid); // Generate possible next states from the initial grid
      const minHeuristicValue = Math.min(
        ...generatedStates.map((stateObj) => stateObj.heuristic) // Find the minimum heuristic value from all generated states
      );
      setMinHeuristic(minHeuristicValue); // Store the minimum heuristic
      setNextStates(generatedStates); // Store the generated next states
    }
  }, [initialGrid]); // Dependency on initialGrid, so it recalculates if initialGrid changes

  // Function to handle the selection of a next state
  // Navigates back to the puzzle page with the selected state
  const handleStateSelection = (nextState) => {
    navigate("/puzzle3x3", { state: { selectedState: nextState } });
  };

  return (
    <div>
      <h1>Puzzle Help</h1>
      <h2>Initial State</h2>
      <div className="grid grid-3x3">
        {initialGrid.map((tile, index) => (
          <div
            key={index}
            className={`grid-item ${tile === null ? "empty" : ""}`}
          >
            {tile !== null ? tile : ""}{" "}
            {/* Display the tile number, or blank if null */}
          </div>
        ))}
      </div>

      <h2>Next Possible States</h2>
      {nextStates.length > 0 ? (
        nextStates.map((nextStateObj, idx) => (
          <div
            key={idx}
            onClick={() => handleStateSelection(nextStateObj.state)} // When clicked, navigate to the next selected state
            style={{
              cursor: "pointer",
              border: "1px solid black",
              marginBottom: "10px",
              backgroundColor:
                nextStateObj.heuristic === minHeuristic
                  ? "lightgreen"
                  : "white", // Highlight the state with the minimum heuristic (best next move)
            }}
          >
            <h3>
              Next State {idx + 1} (Heuristic: {nextStateObj.heuristic}){" "}
              {/* Display the heuristic value */}
            </h3>
            <div className="grid grid-3x3">
              {nextStateObj.state.map((tile, index) => (
                <div
                  key={index}
                  className={`grid-item ${tile === null ? "empty" : ""}`}
                >
                  {tile !== null ? tile : ""}{" "}
                  {/* Display the tiles for the next state */}
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <p>No next states available.</p>
      )}
    </div>
  );
};

export default PuzzleHelp;
