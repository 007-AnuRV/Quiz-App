import React from "react";

export default function Result({ score, total }) {
  return (
    <div className="result-card">
      <h1>Quiz Finished!</h1>
      <p>
        Your Score: {score} / {total}
      </p>
      <button onClick={() => window.location.reload()}>Restart Quiz</button>
    </div>
  );
}
