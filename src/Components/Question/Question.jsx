import "./Question.css";

import React, { useState, useEffect } from "react";

export const Question = ({ questionObj, dispatch }) => {
  useEffect(() => {
    // Reset the state when questionObj changes
    setSelectedAnswer(null);
    setHasAnswered(false);
  }, [questionObj]); // Dependency array includes questionObj

  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const correctAnswerIndex = questionObj.correctOption;

  const handleClickAnswer = (index) => {
    if (hasAnswered) return;
    setSelectedAnswer(index);
    let isCorrectAnswerclicked = index === correctAnswerIndex;
    dispatch({
      type: "pointsUpdate",
      payload: { correctAnswerClicked: isCorrectAnswerclicked },
    });
    setHasAnswered(true);
  };

  const getBackgroundColor = (index) => {
    if (selectedAnswer === null) return ""; // No selection yet
    if (index === correctAnswerIndex) {
      return "green"; // Correct answer
    }
    if (index !== correctAnswerIndex) {
      return "red"; // Incorrect selection
    }
    return ""; // Default color
  };

  return (
    <div className="question-container">
      <h3>{questionObj.question}</h3>
      <div className="choices-container">
        <p
          onClick={() => handleClickAnswer(0)}
          className="choices"
          style={{ backgroundColor: getBackgroundColor(0) }}
        >
          {questionObj.options[0]}
        </p>
        <p
          onClick={() => handleClickAnswer(1)}
          className="choices"
          style={{ backgroundColor: getBackgroundColor(1) }}
        >
          {questionObj.options[1]}
        </p>
      </div>
      <div className="choices-container">
        <p
          onClick={() => handleClickAnswer(2)}
          className="choices"
          style={{ backgroundColor: getBackgroundColor(2) }}
        >
          {questionObj.options[2]}
        </p>
        <p
          onClick={() => handleClickAnswer(3)}
          className="choices"
          style={{ backgroundColor: getBackgroundColor(3) }}
        >
          {questionObj.options[3]}
        </p>
      </div>
    </div>
  );
};
