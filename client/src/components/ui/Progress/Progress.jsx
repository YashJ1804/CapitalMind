export default function Progress({
  value = 0,
  max = 100,
  color = "bg-blue-500",
  height = "h-2",
  showLabel = false,
  className = "",
}) {
  const percentage = Math.min(
    (value / max) * 100,
    100
  );

  return (
    <div className={className}>

      {showLabel && (
        <div className="mb-2 flex justify-between text-sm">
          <span className="text-slate-400">
            Progress
          </span>

          <span className="text-white">
            {Math.round(percentage)}%
          </span>
        </div>
      )}

      <div
        className={`w-full overflow-hidden rounded-full bg-slate-800 ${height}`}
      >
        <div
          className={`${color} ${height} rounded-full transition-all duration-500`}
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>

    </div>
  );
}