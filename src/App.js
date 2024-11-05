import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import PuzzlePage3x3 from "./PuzzlePage3x3";
import PuzzlePage8x8 from "./PuzzlePage8x8";
import PuzzleHelpPage from "./PuzzlehelpPage";
import NextStateSelection from "./NextStateSelection";
import CongratulationsPage from "./CongratulationsPage";

function App() {
  const [gridSize, setGridSize] = useState("0"); // State to track selected grid size
  const navigate = useNavigate();

  const handleGridSizeChange = (event) => {
    const selectedSize = event.target.value;
    setGridSize(selectedSize); // Update grid size on selection
    //console.log(event);

    //Navigate to the corresponding page based on the grid size
    if (selectedSize === "3") navigate("/puzzle3x3");
    else if (selectedSize === "8") navigate("/puzzle8x8");
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Number Puzzle Problem</h1>

        {/* Grid Size Selector */}
        <div className="grid-size-selector">
          <label htmlFor="grid-size">Select Grid Size: </label>
          <select
            id="grid-size"
            value={gridSize}
            onChange={handleGridSizeChange}
          >
            <option value="0">Select Size</option>
            <option value="3">3 x 3</option>
            <option value="8">8 x 8</option>
          </select>
        </div>

        {/* Display selected grid size */}
        {gridSize && (
          <p>
            You've selected a {gridSize} x {gridSize} grid.
          </p>
        )}
      </header>
    </div>
  );
}

function AppWrapper() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/puzzle3x3" element={<PuzzlePage3x3 />} />
        <Route path="/puzzle8x8" element={<PuzzlePage8x8 />} />
        <Route path="/puzzle-help" element={<PuzzleHelpPage />} />
        <Route path="/nextState" element={<NextStateSelection />} />
        <Route path="/congratulations" element={<CongratulationsPage />} />
      </Routes>
    </Router>
  );
}

export default AppWrapper;
