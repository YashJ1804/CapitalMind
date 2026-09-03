import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  BriefcaseBusiness,
  Star,
  LineChart,
  BrainCircuit,
  User,
  Settings,
  LogOut,
  X,
} from "lucide-react";

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    title: "Portfolio",
    icon: BriefcaseBusiness,
    path: "/portfolio",
  },
  {
    title: "Watchlist",
    icon: Star,
    path: "/watchlist",
  },
  {
    title: "Market",
    icon: LineChart,
    path: "/market",
  },
  {
    title: "Analyze",
    icon: BrainCircuit,
    path: "/analyze",
  },
];

const bottomItems = [
  {
    title: "Profile",
    icon: User,
    path: "/profile",
  },
  {
    title: "Settings",
    icon: Settings,
    path: "/settings",
  },
  {
    title: "Logout",
    icon: LogOut,
    path: "/logout",
  },
];

export default function Sidebar({ isOpen = false, onClose = () => {} }) {
  return (
    <>
      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          isOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50
          flex w-72 flex-col justify-between
          border-r border-slate-800 bg-slate-950
          transform transition-transform duration-300 ease-in-out
          lg:static lg:z-auto lg:flex lg:w-64 lg:translate-x-0
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Logo / Header */}
        <div className="min-h-0 overflow-y-auto">
          <div className="flex items-center justify-between px-5 py-6 sm:px-6 sm:py-8">
            <div className="flex min-w-0 items-center gap-3 sm:gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-400 text-xl shadow-lg sm:h-12 sm:w-12 sm:text-2xl">
                📈
              </div>

              <div className="min-w-0">
                <h1 className="truncate text-xl font-bold tracking-tight text-white sm:text-2xl">
                  CapitalMind
                </h1>

                <p className="truncate text-xs text-slate-400 sm:text-sm">
                  AI Investment Intelligence
                </p>
              </div>
            </div>

            {/* Mobile Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="ml-3 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-800 hover:text-white lg:hidden"
              aria-label="Close navigation"
            >
              <X size={20} />
            </button>
          </div>

          {/* Main Menu */}
          <div className="px-4 pb-3 sm:px-6">
            <p className="mb-3 px-2 text-xs font-semibold uppercase tracking-widest text-slate-500">
              Main
            </p>

            <nav className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;

                return (
                  <NavLink
                    key={item.title}
                    to={item.path}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `flex items-center gap-4 rounded-xl px-4 py-3 transition-all duration-200 ${
                        isActive
                          ? "border border-cyan-500/30 bg-blue-600/20 text-cyan-400"
                          : "text-slate-300 hover:bg-slate-800 hover:text-white"
                      }`
                    }
                  >
                    <Icon size={20} className="shrink-0" />

                    <span className="font-medium">{item.title}</span>
                  </NavLink>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="shrink-0 border-t border-slate-800 px-4 py-5 sm:px-6">
          <p className="mb-3 px-2 text-xs font-semibold uppercase tracking-widest text-slate-500">
            Account
          </p>

          <nav className="space-y-2">
            {bottomItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.title}
                  to={item.path}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center gap-4 rounded-xl px-4 py-3 transition-all duration-200 ${
                      isActive
                        ? "border border-cyan-500/30 bg-blue-600/20 text-cyan-400"
                        : item.title === "Logout"
                        ? "text-red-400 hover:bg-red-500/10 hover:text-red-300"
                        : "text-slate-300 hover:bg-slate-800 hover:text-white"
                    }`
                  }
                >
                  <Icon size={20} className="shrink-0" />

                  <span className="font-medium">{item.title}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
}

