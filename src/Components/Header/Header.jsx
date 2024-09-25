import React from "react";
import "./Header.css";

export default function Header() {
  return (
    <div className="header">
      <img className="logo" src="/images/reactlogo.png" alt="React Logo" />
      <h1 className="header-text inria-sans-light">React Quiz</h1>
    </div>
  );
}
