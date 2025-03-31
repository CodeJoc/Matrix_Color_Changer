import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BsVolumeUpFill, BsVolumeMuteFill } from "react-icons/bs";

const MatrixGame = () => {
  const [gridSize, setGridSize] = useState(3);
  const [matrix, setMatrix] = useState(Array(gridSize * gridSize).fill("#B0C4DE"));
  const [clickedIndices, setClickedIndices] = useState([]);
  const [clickCount, setClickCount] = useState(0);
  const [theme, setTheme] = useState("light");
  const [isMuted, setIsMuted] = useState(false);

  const clickSound = new Audio("/sounds/click.mp3");

  const playSound = () => {
    if (!isMuted) {
      clickSound.currentTime = 0; 
      clickSound.play();
    }
  };

  const handleClick = (index) => {
    if (matrix[index] === "#B0C4DE") {
      const newMatrix = [...matrix];
      newMatrix[index] = "green";
      setMatrix(newMatrix);
      setClickedIndices([...clickedIndices, index]);
      setClickCount(clickCount + 1);
      playSound();
    }

    if (index === gridSize * gridSize - 1) {
      setTimeout(() => {
        let newMatrix = [...matrix];
        clickedIndices.forEach((idx, i) => {
          setTimeout(() => {
            newMatrix[idx] = "orange";
            setMatrix([...newMatrix]);
          }, i * 500);
        });
      }, 300);
    }
  };

  const undoLastMove = () => {
    if (clickedIndices.length > 0) {
      const lastIndex = clickedIndices.pop();
      const newMatrix = [...matrix];
      newMatrix[lastIndex] = "#B0C4DE";
      setMatrix(newMatrix);
      setClickedIndices([...clickedIndices]);
      setClickCount(clickCount - 1);
      playSound();
    }
  };

  const resetGame = () => {
    setMatrix(Array(gridSize * gridSize).fill("#B0C4DE"));
    setClickedIndices([]);
    setClickCount(0);
    playSound();
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
    playSound();
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleGridSizeChange = (e) => {
    const newSize = parseInt(e.target.value);
    setGridSize(newSize);
    setMatrix(Array(newSize * newSize).fill("#B0C4DE"));
    setClickedIndices([]);
    setClickCount(0);
    playSound();
  };

  return (
    <div
      className={`container-fluid vh-100 d-flex flex-column align-items-center justify-content-center bg-${theme} text-${theme === "light" ? "dark" : "light"}`}
      style={{ overflowY: "auto" }}
    >
      <div className="d-flex gap-3">
        <button className="btn btn-secondary mb-3" onClick={toggleTheme}>
         {theme === "light" ? "Dark" : "Light"} Mode
        </button>
        <button className="btn btn-secondary mb-3" onClick={toggleMute}>
          {isMuted ? <BsVolumeMuteFill /> : <BsVolumeUpFill />} 
        </button>
      </div>

      <h3 className={`text-${theme === "light" ? "dark" : "light"}`}>Click Count: {clickCount}</h3>

      <div className="mb-3">
        <label className="me-2">Grid Size:</label>
        <select value={gridSize} onChange={handleGridSizeChange} className="form-select w-auto d-inline">
          {Array.from({ length: 6 }, (_, i) => i + 2).map((size) => (
            <option key={size} value={size}>{size}x{size}</option>
          ))}
        </select>
      </div>

      <div className="d-flex justify-content-center" style={{ overflowX: "auto", maxWidth: "90vw", maxHeight: "60vh" }}>
        <div className="d-grid" style={{ gridTemplateColumns: `repeat(${gridSize}, 50px)`, gap: "5px" }}>
          {matrix.map((color, index) => (
            <div
              key={index}
              onClick={() => handleClick(index)}
              style={{
                width: "50px",
                height: "50px",
                backgroundColor: color,
                border: "1px solid black",
                cursor: "pointer",
              }}
            ></div>
          ))}
        </div>
      </div>

      <div className="d-flex gap-2 mt-3">
        <button className="btn btn-warning" onClick={undoLastMove} disabled={clickedIndices.length === 0}>
          Undo
        </button>
        <button className="btn btn-danger" onClick={resetGame}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default MatrixGame;
