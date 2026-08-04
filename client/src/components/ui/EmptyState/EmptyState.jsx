import Button from "../Button/Button";

export default function EmptyState({
  icon = "📭",
  title = "Nothing Here",
  description = "There is no data available.",
  actionText,
  onAction,
  className = "",
}) {
  return (
    <div
      className={`
        flex flex-col items-center justify-center
        rounded-3xl
        border border-dashed border-slate-700
        bg-slate-900
        px-8 py-14
        text-center
        ${className}
      `}
    >
      <div className="text-7xl">{icon}</div>

      <h2 className="mt-6 text-3xl font-bold text-white">
        {title}
      </h2>

      <p className="mt-3 max-w-md text-slate-400">
        {description}
      </p>

      {actionText && (
        <div className="mt-8">
          <Button onClick={onAction}>
            {actionText}
          </Button>
        </div>
      )}
    </div>
  );
}