import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Info,
} from "lucide-react";

export default function Alert({
  variant = "info",
  title,
  children,
  className = "",
}) {
  const variants = {
    success: {
      icon: <CheckCircle2 size={20} />,
      wrapper: "border-green-500/30 bg-green-500/10",
      iconColor: "text-green-400",
      titleColor: "text-green-300",
    },

    warning: {
      icon: <AlertTriangle size={20} />,
      wrapper: "border-yellow-500/30 bg-yellow-500/10",
      iconColor: "text-yellow-400",
      titleColor: "text-yellow-300",
    },

    error: {
      icon: <XCircle size={20} />,
      wrapper: "border-red-500/30 bg-red-500/10",
      iconColor: "text-red-400",
      titleColor: "text-red-300",
    },

    info: {
      icon: <Info size={20} />,
      wrapper: "border-blue-500/30 bg-blue-500/10",
      iconColor: "text-blue-400",
      titleColor: "text-blue-300",
    },
  };

  const current = variants[variant];

  return (
    <div
      className={`
        flex gap-4
        rounded-2xl
        border
        p-5
        ${current.wrapper}
        ${className}
      `}
    >
      <div className={current.iconColor}>
        {current.icon}
      </div>

      <div className="flex-1">
        {title && (
          <h4
            className={`font-semibold ${current.titleColor}`}
          >
            {title}
          </h4>
        )}

        <div className="mt-1 text-sm text-slate-300">
          {children}
        </div>
      </div>
    </div>
  );
}