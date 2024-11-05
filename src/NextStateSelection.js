import React from "react";
import { useNavigate } from "react-router-dom";
import "./NextStateSelection.css";

const NextStateSelection = ({ states, heuristicValues }) => {
  const navigate = useNavigate();

  // Find the index of the state with the minimum heuristic value
  const minHeuristicIndex = heuristicValues.indexOf(
    Math.min(...heuristicValues)
  );

  const handleStateClick = (selectedState) => {
    navigate("/puzzle3x3", { state: { selectedState } });
  };

  return (
    <div className="next-state-selection-page">
      <h2 className="instruction-text">Select any state to proceed:</h2>

      <div className="grid-container">
        {states.map((state, index) => (
          <div
            key={index}
            className={`grid ${index === minHeuristicIndex ? "highlight" : ""}`}
            onClick={
              index === minHeuristicIndex ? () => handleStateClick(state) : null
            }
            style={{
              cursor: index === minHeuristicIndex ? "pointer" : "not-allowed",
            }}
          >
            {state.map((num, i) => (
              <div key={i} className="grid-item">
                {num}
              </div>
            ))}
            <div className="heuristic-value">
              Heuristic Value: {heuristicValues[index]}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Example usage with sample states and heuristic values
const App = () => {
  // Sample states as arrays representing 3x3 grids
  const sampleStates = [
    [1, 2, 3, 4, 5, 6, 7, 8, 0], // State 1
    [1, 0, 3, 4, 2, 5, 7, 8, 6], // State 2
    [0, 1, 2, 3, 4, 5, 6, 7, 8], // State 3
    [1, 3, 4, 0, 2, 5, 6, 7, 8], // State 4
  ];

  // Assigning heuristic values for each state
  const heuristicValues = [2, 3, 1, 4]; // Example heuristic values for each state

  return (
    <NextStateSelection
      states={sampleStates}
      heuristicValues={heuristicValues}
    />
  );
};

export default App;
