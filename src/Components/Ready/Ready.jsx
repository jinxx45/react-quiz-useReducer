import React from "react";
import "./Ready.css";

export const Ready = ({ totalQuestions, dispatch }) => {
  const handlestartQuiz = () => {
    dispatch({ type: "start" });
  };

  return (
    <div className="ready-container inria-sans-light">
      <h1>Welcome to the React Quiz !</h1>
      <p>{totalQuestions} questions to test your react Mastery</p>
      <button
        onClick={handlestartQuiz}
        className="inria-sans-light start-button"
      >
        Lets start
      </button>
    </div>
  );
};
