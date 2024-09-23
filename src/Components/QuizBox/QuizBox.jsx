import React, { useEffect, useReducer } from "react";
import "./QuizBox.css";
import { Ready } from "../Ready/Ready";
import { Question } from "../Question/Question";

const initialState = {
  question: [],
  status: "loading",
  index: 0,
  points: 0,
  showNext: false,
};

function reducer(currentState, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...currentState,
        question: action.payload,
        status: "ready",
      };
    case "dataFailed":
      return {
        ...currentState,
        status: "error",
      };
    case "start":
      return {
        ...currentState,
        status: "start",
      };
    case "pointsUpdate":
      if (action.payload.correctAnswerClicked) {
        return {
          ...currentState,
          points: currentState.points + 10,
          showNext: true,
        };
      } else {
        return {
          ...currentState,
          points: currentState.points - 5,
          showNext: true,
        };
      }
    case "nextClicked":
      return {
        ...currentState,
        index: currentState.index + 1,
        showNext: false,
      };

    default:
      throw new Error("Action unknown");
  }
}

export default function QuizBox() {
  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  const [state, dispatch] = useReducer(reducer, initialState);
  const totalQuestions = state.question.length;
  console.log(state);

  const handleNext = () => {
    dispatch({ type: "nextClicked" });
  };

  return (
    <div className="questionbox-container inria-sans-light">
      {state.status === "loading" && <> Loading...</>}
      {state.status === "error" && <>Error</>}
      {state.status === "ready" && (
        <Ready totalQuestions={totalQuestions} dispatch={dispatch} />
      )}
      {state.status === "start" && (
        <div className="question-with-points">
          {state.index < state.question.length ? (
            <>
              <Question
                questionObj={state.question[state.index]}
                dispatch={dispatch}
              />
              <div className="status-bar">
                <h4>Points: {state.points}</h4>
                <h4>Time</h4>
                {state.showNext === true && (
                  <button onClick={handleNext} className="next-button">
                    Next
                  </button>
                )}
              </div>
            </>
          ) : (
            <div className="end-screen">
              <h2>Quiz Completed!</h2>
              <h4>Your Total Points: {state.points}</h4>
              {/* You can add more content here, like a restart button or review answers */}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
