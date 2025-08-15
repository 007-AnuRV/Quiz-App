import { decodeHtml, shuffle } from "./helpers";

// Fetches 15 quiz questions from Open Trivia DB API
export const fetchQuestions = async () => {
  const res = await fetch("https://opentdb.com/api.php?amount=15");

  // Throws error
  //if API request fails OR response is not as expected
  if (!res.ok) throw new Error("Failed to fetch questions");
  const data = await res.json();
  if (!data || !Array.isArray(data.results))
    throw new Error("Unexpected API shape");

  // Maps API results to app-specific question objects
  return data.results.map((q, idx) => {
    const question = decodeHtml(q.question);
    const correct = decodeHtml(q.correct_answer);
    const incorrects = q.incorrect_answers.map((x) => decodeHtml(x));

    // Combine correct and incorrect answers and shuffle them
    const options = shuffle([correct, ...incorrects]).map((text, k) => ({
      id: `${idx}-${k}`,
      text,
    }));

    // Return question object
    return {
      id: idx,
      category: q.category,
      difficulty: q.difficulty,
      type: q.type,
      question,
      correct,
      options,
      userAnswer: null,
      visited: false,
      attempted: false,
    };
  });
};
