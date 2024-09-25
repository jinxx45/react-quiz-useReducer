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
  timeRemaining: 600,
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
    case "decrementTime":
      return {
        ...currentState,
        timeRemaining: currentState.timeRemaining - 1,
      };
    case "timeUp":
      return {
        ...currentState,
        status: "finished",
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

  useEffect(() => {
    if (state.status === "start" && state.timeRemaining > 0) {
      //dispatching an event every one second to decrement timer
      const timer = setInterval(() => {
        dispatch({ type: "decrementTime" });
      }, 1000);

      // Clear the timer when the component is unmounted or when time runs out
      return () => clearInterval(timer);
    } else if (state.timeRemaining === 0) {
      dispatch({ type: "timeUp" });
    }
  }, [state.status, state.timeRemaining]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
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
                <h4>Time Remaining : {formatTime(state.timeRemaining)}</h4>
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
            </div>
          )}
          {state.status === "finished" && (
            <div className="end-screen">
              <h2>Time's Up!</h2>
              <h4>Your Total Points: {state.points}</h4>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
