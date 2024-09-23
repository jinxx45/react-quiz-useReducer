import React, { useEffect, useReducer } from "react";
import "./QuizBox.css";
import { Ready } from "../Ready/Ready";
import { Question } from "../Question/Question";

const initialState = {
  question: [],
  status: "loading",
  index: 0,
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

  return (
    <div className="question-container">
      {state.status === "loading" && <> Loading...</>}
      {state.status === "error" && <>Error</>}
      {state.status === "ready" && (
        <Ready totalQuestions={totalQuestions} dispatch={dispatch} />
      )}
      {state.status === "start" && (
        <Question question={state.question[state.index]} />
      )}
    </div>
  );
}
