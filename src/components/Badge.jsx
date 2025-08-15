export default function Badge({ children, className = "" }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5  font-medium ${className}`}
    >
      {children}
    </span>
  );
}
