import React, { useState } from "react";
import Question from "./Question";

// Handles quiz progression: displays the current question, updates the score 
// when a user answers, and calls the submission callback when the quiz ends or user finishes.

export default function Quiz({ questions, onFormSubmit }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);

  const handleAnswer = (isCorrect) => {
    if (isCorrect) setScore(score + 1);
    const next = currentIndex + 1;
    if (next < questions.length) {
      setCurrentIndex(next);
    } else {
      onFormSubmit(score + (isCorrect ? 1 : 0));
    }
  };

  return (
    <div className="quiz-container">
      <Question question={questions[currentIndex]} onAnswer={handleAnswer} />
    </div>
  );
}
