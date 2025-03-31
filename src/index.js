import React from "react";
import ReactDOM from "react-dom/client"; // Use createRoot for React 18+
import MatrixGame from "./App"; 

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<MatrixGame />);
