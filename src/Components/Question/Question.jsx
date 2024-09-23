import "./Question.css";

import React from "react";

export const Question = (question) => {
  return (
    <div className="question-container">
      <h1>{question}</h1>
      <div>
        <p>Choice1</p>
      </div>
    </div>
  );
};
