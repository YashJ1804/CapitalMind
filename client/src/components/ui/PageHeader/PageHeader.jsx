export default function PageHeader({
  title,
  subtitle,
  icon,
  action,
  className = "",
}) {
  return (
    <div
      className={`mb-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between ${className}`}
    >
      <div>
        <h1 className="flex items-center gap-3 text-4xl font-black text-white lg:text-5xl">
          {icon && <span>{icon}</span>}
          <span>{title}</span>
        </h1>

        {subtitle && (
          <p className="mt-3 max-w-2xl text-slate-400">
            {subtitle}
          </p>
        )}
      </div>

      {action && (
        <div className="flex items-center">
          {action}
        </div>
      )}
    </div>
  );
}