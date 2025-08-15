import React from "react";
import Card from "../components/Card";
import Button from "../components/Button";
import Badge from "../components/Badge";

        // Displays the user's quiz results including score, attempted/unattempted questions, 
        // and a review of each question with user vs correct answers.*/
        
export default function ReportPage({ email, questions, score, restart }) {
  return (
    <div className="min-h-screen bg-sky-100 p-4 md:p-8">
      <div className="mx-auto max-w-5xl space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-bold">Quiz Report</h1>
          <Badge className="bg-gray-100 text-gray-800">{email}</Badge>
        </div>

        {/* Score, attempted/unattempted questions, instructions */}
        <Card className="p-6">
          <div className="flex flex-wrap items-center gap-3">
            <Badge className="bg-green-100 text-green-800">
              Score: {score} / {questions.length}
            </Badge>
            <Badge className="bg-blue-100 text-blue-800">
              Attempted: {questions.filter((q) => q.attempted).length}
            </Badge>
            <Badge className="bg-gray-100 text-gray-800">
              Unattempted: {questions.filter((q) => !q.attempted).length}
            </Badge>
          </div>
          <p className="text-gray-600 mt-2 text-sm">
            Below you can review each question with your answer vs the correct
            answer.
          </p>
        </Card>

        {/* List all questions with user's answer and correct answer */}
        <div className="space-y-4">
          {questions.map((q, i) => {
            const correct = q.userAnswer === q.correct;
            return (
              <Card key={q.id} className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-sm font-semibold text-gray-900">
                      Question {i + 1}
                    </div>
                    <h3 className="text-lg font-semibold mt-1">{q.question}</h3>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <Badge className="bg-gray-100 text-gray-800">
                        {q.category}
                      </Badge>
                      <Badge
                        className={`capitalize ${
                          q.difficulty === "easy"
                            ? "bg-sky-100 text-sky-600"
                            : q.difficulty === "medium"
                            ? "bg-orange-100 text-orange-600"
                            : q.difficulty === "hard"
                            ? "bg-red-100 text-red-600"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {q.difficulty}
                      </Badge>
                    </div>
                  </div>
                  <Badge
                    className={
                      correct
                        ? "bg-emerald-600 text-white"
                        : "bg-red-400 text-white"
                    }
                  >
                    {correct ? "Correct" : "Incorrect"}
                  </Badge>
                </div>
                <div className="mt-4 grid gap-2 text-sm">
                  <div className="flex flex-col md:flex-row md:items-center gap-2">
                    <span className="font-medium w-32 font-semibold">
                      Your answer:
                    </span>
                    <span
                      className={`${
                        correct ? "text-green-700" : "text-red-700"
                      }`}
                    >
                      {q.userAnswer ?? "—"}
                    </span>
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center gap-2">
                    <span className="font-medium w-32 font-semibold">
                      Correct answer:
                    </span>
                    <span className="text-green-700">{q.correct}</span>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Provides a Restart button to reset the quiz and go back to the start*/}
        <div className="pt-4 ">
          <Button
            className="bg-green-600 text-white cursor-pointer"
            onClick={restart}
          >
            Restart
          </Button>
        </div>

        <p className="text-xs text-gray-500">Questions from OpenT DB.</p>
      </div>
    </div>
  );
}