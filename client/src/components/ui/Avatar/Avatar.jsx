export default function Avatar({
  src,
  name = "User",
  size = "md",
  className = "",
}) {
  const sizes = {
    sm: "h-8 w-8 text-sm",
    md: "h-10 w-10 text-base",
    lg: "h-14 w-14 text-lg",
    xl: "h-20 w-20 text-2xl",
  };

  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  if (src) {
    return (
      <img
        src={src}
        alt={name}
        className={`
          rounded-full
          object-cover
          border
          border-slate-700
          ${sizes[size]}
          ${className}
        `}
      />
    );
  }

  return (
    <div
      className={`
        flex items-center justify-center
        rounded-full
        border border-slate-700
        bg-blue-600
        font-semibold
        text-white
        ${sizes[size]}
        ${className}
      `}
    >
      {initials}
    </div>
  );
}