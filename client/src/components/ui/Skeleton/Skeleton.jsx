export default function Skeleton({
  className = "",
  rounded = "rounded-xl",
}) {
  return (
    <div
      className={`
        animate-pulse
        bg-slate-800
        ${rounded}
        ${className}
      `}
    />
  );
}