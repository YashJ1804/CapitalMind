export default function Card({
  children,
  className = "",
  hover = false,
  padding = "p-6",
}) {
  return (
    <div
      className={`
        rounded-3xl
        border
        border-slate-800
        bg-slate-900
        shadow-lg
        transition-all
        duration-300
        ${hover ? "hover:border-blue-500/50 hover:-translate-y-1 hover:shadow-2xl" : ""}
        ${padding}
        ${className}
      `}
    >
      {children}
    </div>
  );
}