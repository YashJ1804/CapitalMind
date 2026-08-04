import { useEffect, useRef, useState } from "react";

export default function Dropdown({
  trigger,
  items = [],
  align = "right",
}) {
  const [open, setOpen] = useState(false);

  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (!ref.current?.contains(e.target)) {
        setOpen(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  return (
    <div
      ref={ref}
      className="relative inline-block"
    >
      <div
        onClick={() => setOpen(!open)}
        className="cursor-pointer"
      >
        {trigger}
      </div>

      {open && (
        <div
          className={`
            absolute
            mt-2
            w-56
            rounded-xl
            border
            border-slate-800
            bg-slate-900
            py-2
            shadow-2xl
            z-50

            ${
              align === "left"
                ? "left-0"
                : "right-0"
            }
          `}
        >
          {items.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                item.onClick?.();
                setOpen(false);
              }}
              className={`
                flex
                w-full
                items-center
                gap-3
                px-4
                py-3
                text-left
                transition

                ${
                  item.danger
                    ? "text-red-400 hover:bg-red-500/10"
                    : "text-slate-300 hover:bg-slate-800"
                }
              `}
            >
              {item.icon}

              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}