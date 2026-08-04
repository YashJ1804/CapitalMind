export default function Tabs({
  tabs = [],
  activeTab,
  onChange,
  className = "",
}) {
  return (
    <div
      className={`
        inline-flex
        rounded-xl
        bg-slate-900
        p-1
        ${className}
      `}
    >
      {tabs.map((tab) => {
        const active = activeTab === tab.value;

        return (
          <button
            key={tab.value}
            onClick={() => onChange(tab.value)}
            className={`
              rounded-lg
              px-5
              py-2
              text-sm
              font-medium
              transition-all

              ${
                active
                  ? "bg-blue-600 text-white shadow-lg"
                  : "text-slate-400 hover:text-white"
              }
            `}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}