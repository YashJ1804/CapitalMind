export default function Badge({
  children,
  variant = "default",
  size = "md",
  rounded = true,
  className = "",
}) {
  const variants = {
    default:
      "bg-slate-800 text-slate-300 border border-slate-700",

    primary:
      "bg-blue-500/15 text-blue-400 border border-blue-500/30",

    success:
      "bg-green-500/15 text-green-400 border border-green-500/30",

    warning:
      "bg-yellow-500/15 text-yellow-400 border border-yellow-500/30",

    danger:
      "bg-red-500/15 text-red-400 border border-red-500/30",

    purple:
      "bg-purple-500/15 text-purple-400 border border-purple-500/30",
  };

  const sizes = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1.5 text-sm",
    lg: "px-4 py-2 text-base",
  };

  return (
    <span
      className={`
        inline-flex
        items-center
        justify-center
        font-semibold
        whitespace-nowrap
        transition-colors
        duration-200
        ${rounded ? "rounded-full" : "rounded-lg"}
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
    >
      {children}
    </span>
  );
}