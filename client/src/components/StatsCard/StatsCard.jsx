export default function StatsCard({
  title,
  value,
  icon,
  color = "text-blue-400",
  subtitle,
  trend,
  hover = true,
  className = "",
}) {
  return (
    <div
      className={`
        rounded-2xl
        border
        border-slate-800
        bg-slate-900
        p-6
        transition-all
        duration-300
        ${
          hover
            ? "hover:-translate-y-1 hover:border-blue-500/40 hover:shadow-xl"
            : ""
        }
        ${className}
      `}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-slate-400">
          {title}
        </p>

        {icon && (
          <div className="text-2xl">
            {icon}
          </div>
        )}
      </div>

      {/* Value */}
      <h2 className={`mt-4 text-4xl font-bold ${color}`}>
        {value}
      </h2>

      {/* Footer */}
      {(subtitle || trend) && (
        <div className="mt-4 flex items-center justify-between">
          {subtitle && (
            <p className="text-sm text-slate-500">
              {subtitle}
            </p>
          )}

          {trend && (
            <span className="rounded-full bg-slate-800 px-3 py-1 text-xs font-semibold text-green-400">
              {trend}
            </span>
          )}
        </div>
      )}
    </div>
  );
}