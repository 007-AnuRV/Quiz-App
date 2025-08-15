export default function Card({ children, className = "" }) {
  return (
    <div
      className={`rounded-2xl shadow-sm border border-gray-200 bg-white ${className}`}
    >
      {children}
    </div>
  );
}
