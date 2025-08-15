export default function Button({
  children,
  onClick,
  disabled,
  type = "button",
  className = "",
}) {
    
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 rounded-xl border text-sm font-medium transition focus:outline-none focus:ring ${
       
          disabled
          ? "opacity-20 cursor-not-allowed" // keep original color but fade it
          : "hover:translate-y-[1px]"
      } ${className}`}
    >
      {children}
    </button>
  );
}
