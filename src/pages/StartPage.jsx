import React, { useState } from "react";
import Card from "../components/Card";
import Button from "../components/Button";
import { validateEmail } from "../utils/helpers";
import { fetchQuestions } from "../utils/api";

export default function StartPage({
  email,
  setEmail,
  emailError,
  setEmailError,
  startQuizHandler,
}) {
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState("");

  const startQuiz = async () => {
    setEmailError("");
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }
    setLoading(true);
    setFetchError("");
    try {
      const questions = await fetchQuestions();
      startQuizHandler(questions);
    } catch (err) {
      setFetchError(err.message || "Something went wrong fetching questions.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-sky-100 flex items-center justify-center p-4">
      <Card className="max-w-xl w-full p-10 shadow-lg">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
          Quiz Application
        </h1>
        <p className="text-gray-800 mt-2">
          Enter your email to start a 15-question quiz. You’ll have 30 minutes
          to complete it, and it will auto-submit when time runs out.
        </p>

        <form
          className="mt-6 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            startQuiz();
          }}
        >
          <label className="block">
            <span className="text-sm font-medium">Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-black focus:outline-none"
              required
            />
          </label>
          {emailError && <p className="text-sm text-red-600">{emailError}</p>}

          <div className="flex items-center gap-3">
            <Button
              className="bg-blue-500 text-white cursor-pointer"
              type="submit"
              disabled={loading}
            >
              {loading ? "Loading…" : "Start Quiz"}
            </Button>
            {fetchError && (
              <span className="text-sm text-red-600">{fetchError}</span>
            )}
          </div>
        </form>

        <p className="text-xs text-gray-500 mt-6">
          Questions source: Open Trivia DB (opentdb.com)
        </p>
      </Card>
    </div>
  );
}
