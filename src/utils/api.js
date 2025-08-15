import { decodeHtml, shuffle } from "./helpers";

export const fetchQuestions = async () => {
  const res = await fetch("https://opentdb.com/api.php?amount=15");
  if (!res.ok) throw new Error("Failed to fetch questions");
  const data = await res.json();
  if (!data || !Array.isArray(data.results))
    throw new Error("Unexpected API shape");

  return data.results.map((q, idx) => {
    const question = decodeHtml(q.question);
    const correct = decodeHtml(q.correct_answer);
    const incorrects = q.incorrect_answers.map((x) => decodeHtml(x));
    const options = shuffle([correct, ...incorrects]).map((text, k) => ({
      id: `${idx}-${k}`,
      text,
    }));
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
