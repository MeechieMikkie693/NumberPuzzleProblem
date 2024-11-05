import React from "react";
import "./CongratulationsPage.css";

const CongratulationsPage = ({ onTryAgain, onGoHome }) => {
  return (
    <div className="congratulations-page">
      <h1>Congratulations!</h1>
      <h2>You have solved the puzzle!</h2>
      <div className="button-container">
        <button onClick={onTryAgain}>Try Again</button>
        <button onClick={onGoHome}>Go to Home Page</button>
      </div>
    </div>
  );
};

export default CongratulationsPage;
