
import React from "react";

// Displays a single quiz question with multiple-choice options, 
// shuffles the options randomly, and calls the callback when a user selects an answer.

function Question({ question, onUserAnswer }) {
  const shuffle = (array) => [...array].sort(() => Math.random() - 0.5);

  const options = shuffle([
    question.correct_answer,
    ...question.incorrect_answers,
  ]);

  return (
    <div className="question-card">
      <h2>{question.question}</h2>
      <div className="options">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => onUserAnswer(option)}
            className="option-btn"
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Question;
