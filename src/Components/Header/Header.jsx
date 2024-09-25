import React from "react";
import "./Header.css";
import ReactLogo from "../../../public/images/reactlogo.png";

export default function Header() {
  return (
    <div className="header">
      <img className="logo" src={ReactLogo} alt="React Logo" />
      <h1 className="header-text inria-sans-light">React Quiz</h1>
    </div>
  );
}
