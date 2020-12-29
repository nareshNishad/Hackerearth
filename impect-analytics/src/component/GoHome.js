import React from "react";
import { useHistory } from "react-router-dom";

function GoHome() {
  const history = useHistory();
  return (
    <button
      style={{ backgroundColor: "#2a8ba5", width: "60px" }}
      onClick={() => history.push("/")}
    >
      Home
    </button>
  );
}

export default GoHome;
