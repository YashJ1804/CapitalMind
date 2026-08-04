export default function Section({
  title,
  subtitle,
  action,
  children,
  className = "",
}) {
  return (
    <section className={`space-y-6 ${className}`}>
      {(title || subtitle || action) && (
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            {title && (
              <h2 className="text-2xl font-bold text-white">
                {title}
              </h2>
            )}

            {subtitle && (
              <p className="mt-1 text-slate-400">
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
      )}

      {children}
    </section>
  );
}