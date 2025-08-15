// Total quiz duration in seconds (30 minutes)
export const TOTAL_SECONDS = 30 * 60;

// Decodes HTML entities in a string (e.g., &amp; → &)
export const decodeHtml = (str) => {
  const txt = document.createElement("textarea");
  txt.innerHTML = str;
  return txt.value;
};

// Shuffles an array randomly
export const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

// Validates email format using a regex pattern
export const validateEmail = (val) => /[^\s@]+@[^\s@]+\.[^\s@]+/.test(val);

// Formats seconds into MM:SS format
export const formatTime = (sec) => {
  const m = Math.floor(sec / 60)
    .toString()
    .padStart(2, "0");
  const s = (sec % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
};
