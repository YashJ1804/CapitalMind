import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export default function Input({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  type = "text",
  className = "",
  disabled = false,
  ...props
}) {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="mb-2 block text-sm font-medium text-slate-300">
          {label}
        </label>
      )}

      <div
        className={`
          flex items-center gap-3
          rounded-xl
          border
          bg-slate-900
          px-4 py-3
          transition-all
          duration-200

          ${
            error
              ? "border-red-500 focus-within:border-red-400"
              : "border-slate-700 focus-within:border-blue-500"
          }

          ${
            disabled
              ? "cursor-not-allowed opacity-60"
              : ""
          }
        `}
      >
        {leftIcon && (
          <div className="text-slate-400">
            {leftIcon}
          </div>
        )}

        <input
          {...props}
          disabled={disabled}
          type={
            isPassword
              ? showPassword
                ? "text"
                : "password"
              : type
          }
          className="
            flex-1
            bg-transparent
            text-white
            outline-none
            placeholder:text-slate-500
          "
        />

        {isPassword ? (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-slate-400 transition hover:text-white"
          >
            {showPassword ? (
              <EyeOff size={18} />
            ) : (
              <Eye size={18} />
            )}
          </button>
        ) : (
          rightIcon && (
            <div className="text-slate-400">
              {rightIcon}
            </div>
          )
        )}
      </div>

      {error ? (
        <p className="mt-2 text-sm text-red-400">
          {error}
        </p>
      ) : (
        helperText && (
          <p className="mt-2 text-sm text-slate-500">
            {helperText}
          </p>
        )
      )}
    </div>
  );
}