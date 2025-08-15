import React, { useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Card from "../components/Card";
import Button from "../components/Button";
import Badge from "../components/Badge";
import { formatTime } from "../utils/helpers";

export default function QuizPage({
  email,
  questions,
  setQuestions,
  currentIndex,
  setCurrentIndex,
  remaining,
  setPhase,
  timerRef,
}) {
  // Mark question as visited
  useEffect(() => {
    setQuestions((prev) =>
      prev.map((q, i) => (i === currentIndex ? { ...q, visited: true } : q))
    );
  }, [currentIndex, setQuestions]);

  const onAnswer = (optionText) => {
    setQuestions((prev) =>
      prev.map((q, i) =>
        i === currentIndex
          ? { ...q, userAnswer: optionText, attempted: true }
          : q
      )
    );
  };

  const next = () =>
    setCurrentIndex((i) => Math.min(i + 1, questions.length - 1));
  const prev = () => setCurrentIndex((i) => Math.max(i - 1, 0));
  const goto = (i) => setCurrentIndex(i);

const answeredCount = useMemo(
  () => questions.filter((q) => q.attempted).length,
  [questions]
);


  const visitedCount = useMemo(
    () => questions.filter((q) => q.visited).length,
    [questions]
  );

  const submitQuiz = () => {
    setPhase("report");
    if (timerRef.current) clearInterval(timerRef.current);
  };

const clearResponse = (questionId) => {
  setQuestions((prev) =>
    prev.map((item) =>
      item.id === questionId
        ? { ...item, userAnswer: null, attempted: false }
        : item
    )
  );
};

  const q = questions[currentIndex];

  return (
    <div className="min-h-screen bg-sky-100 p-4 md:p-8">
      <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 items-start">
        {/* Main panel */}
        <div className="space-y-4">
          {/* Top bar */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Badge className="bg-gray-100 text-gray-900">
                Email: {email}
              </Badge>
              <Badge
                className={`text-white px-4 py-0 text-[16px] ${
                  remaining < 60
                    ? "bg-red-600"
                    : remaining < 5 * 60
                    ? "bg-yellow-600"
                    : "bg-green-600"
                }`}
              >
                ⏰ {formatTime(remaining)}
              </Badge>
            </div>
            <div>
              <Button
                className="bg-emerald-600 text-white"
                onClick={submitQuiz}
              >
                Submit
              </Button>
            </div>
          </div>

          {/* Question card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={q.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-sm font-semibold text-gray-900">
                      Question {currentIndex + 1} of {questions.length}
                    </div>
                    <h2 className="text-lg md:text-xl font-semibold mt-1">
                      {q.question}
                    </h2>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <Badge className="bg-gray-100 text-gray-800 text-[16px]">
                        {q.category}
                      </Badge>
                      <Badge
                        className={`capitalize ${
                          q.difficulty === "easy"
                            ? "bg-sky-100 text-sky-600 text-[16px]"
                            : q.difficulty === "medium"
                            ? "bg-orange-100 text-orange-600 text-[16px]"
                            : q.difficulty === "hard"
                            ? "bg-red-100 text-red-600 text-[16px]"
                            : "bg-gray-100 text-gray-800 text-[16px]"
                        }`}
                      >
                        {q.difficulty}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Options */}
                <div className="mt-6 grid gap-3">
                  {q.options.map((opt) => (
                    <label
                      key={opt.id}
                      className={`flex items-center gap-3 p-3 border rounded-xl cursor-pointer transition ${
                        q.userAnswer === opt.text
                          ? "border-black bg-gray-50"
                          : "border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      <input
                        type="radio"
                        name={`q-${q.id}`}
                        checked={q.userAnswer === opt.text}
                        onChange={() => onAnswer(opt.text)}
                        className="h-4 w-4"
                      />
                      <span className="text-sm md:text-base">{opt.text}</span>
                    </label>
                  ))}
                </div>

                {/* Navigation */}
                <div className="mt-6 flex items-center justify-between">
                  <Button
                    onClick={prev}
                    disabled={currentIndex === 0}
                    className="min-w-[100px] bg-gray-500 text-white"
                  >
                    Previous
                  </Button>
                  <div className="text-sm text-gray-500">
                    {q.attempted ? (
                      <div
                        className="text-sm text-red-500 cursor-pointer hover:underline"
                        onClick={() => clearResponse(q.id)}
                      >
                        Clear Response
                      </div>
                    ) : (
                      "Not answered"
                    )}
                  </div>
                  <Button
                    onClick={next}
                    disabled={currentIndex === questions.length - 1}
                    className="min-w-[100px] bg-blue-500 text-white"
                  >
                    Next
                  </Button>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Overview side panel */}
        <Card className="p-4" style={{ minHeight: "800px" }}>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">Overview</h3>

            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span className="inline-flex items-center gap-1">
                <span className="h-3 w-3 rounded-full bg-yellow-500 inline-block" />{" "}
                Current
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="h-3 w-3 rounded-full bg-green-600 inline-block" />{" "}
                Attempted
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="h-3 w-3 rounded-full bg-purple-400 inline-block" />{" "}
                Visited
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 mb-3 gap-4">
            <Badge className="bg-purple-100 text-blue-800 text-[15px]">
              Visited: {visitedCount}/{questions.length}
            </Badge>
            <Badge className="bg-green-100 text-purple-800 text-[15px]">
              Attempted: {answeredCount}/{questions.length}
            </Badge>
          </div>
          <div className="grid grid-cols-8 gap-2 md:grid-cols-10 lg:grid-cols-6">
            {questions.map((q, i) => {
              const isCurrent = i === currentIndex;
              const base =
                "h-8 w-8 rounded-full flex items-center justify-center text-xs font-medium border transition";
              let styles = "bg-gray-100 text-gray-700 border-gray-200";
              if (q.visited)
                styles = "bg-purple-400 text-blue-800 border-blue-200";
              if (q.attempted)
                styles = "bg-green-600 text-white-800 border-purple-200";
              if (isCurrent) styles = "bg-yellow-500 text-white border-black";

              return (
                <button
                  key={q.id}
                  onClick={() => goto(i)}
                  className={`${base} ${styles}`}
                  title={`Go to question ${i + 1}`}
                >
                  {i + 1}
                </button>
              );
            })}
          </div>

          <div className="mt-4 text-sm text-gray-600">
            Click a number to jump to that question. You can submit anytime;
            otherwise it auto-submits when the timer ends.
          </div>
        </Card>
      </div>
    </div>
  );
}
