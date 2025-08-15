import React, { useState, useRef, useEffect, useMemo } from "react";
import StartPage from "./pages/StartPage";
import QuizPage from "./pages/QuizPage";
import ReportPage from "./pages/ReportPage";
import { TOTAL_SECONDS } from "./utils/helpers";

export default function App() {
  const [phase, setPhase] = useState("start");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [remaining, setRemaining] = useState(TOTAL_SECONDS);
  const timerRef = useRef(null);

  // Start quiz
  const startQuizHandler = (newQuestions) => {
    setQuestions(newQuestions);
    setPhase("quiz");
    setCurrentIndex(0);
    setRemaining(TOTAL_SECONDS);
  };

  // Timer
  useEffect(() => {
    if (phase !== "quiz") return;
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setRemaining((sec) => {
        if (sec <= 1) {
          clearInterval(timerRef.current);
          setPhase("report");
          return 0;
        }
        return sec - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [phase]);

  // Score
  const score = useMemo(() => {
    return questions.reduce(
      (acc, q) => acc + (q.userAnswer === q.correct ? 1 : 0),
      0
    );
  }, [questions]);

  // Reset
  const resetQuiz = () => {
    setPhase("start");
    setQuestions([]);
    setEmail("");
    setEmailError("");
    setRemaining(TOTAL_SECONDS);
    setCurrentIndex(0);
  };

  return (
    <>
      {phase === "start" && (
        <StartPage
          email={email}
          setEmail={setEmail}
          emailError={emailError}
          setEmailError={setEmailError}
          startQuizHandler={startQuizHandler}
        />
      )}
      {phase === "quiz" && (
        <QuizPage
          email={email}
          questions={questions}
          setQuestions={setQuestions}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          remaining={remaining}
          setPhase={setPhase}
          timerRef={timerRef}
        />
      )}
      {phase === "report" && (
        <ReportPage
          email={email}
          questions={questions}
          score={score}
          restart={resetQuiz}
        />
      )}
    </>
  );
}
