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

export default function Sidebar() {
  return (
    <aside className="hidden lg:flex w-64 flex-col justify-between border-r border-slate-800 bg-slate-950">

      {/* Logo */}
      <div>

        <div className="flex items-center gap-4 px-6 py-8">

          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-400 text-2xl shadow-lg">
            📈
          </div>

          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">
              CapitalMind
            </h1>

            <p className="text-sm text-slate-400">
              AI Investment Intelligence
            </p>
          </div>

        </div>

        {/* Main Menu */}

        <div className="px-6 pb-3">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-500">
            Main
          </p>

          <nav className="space-y-2">

            {menuItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.title}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-4 rounded-xl px-4 py-3 transition-all duration-200 ${
                      isActive
                        ? "bg-blue-600/20 text-cyan-400 border border-cyan-500/30"
                        : "text-slate-300 hover:bg-slate-800 hover:text-white"
                    }`
                  }
                >
                  <Icon size={20} />

                  <span className="font-medium">
                    {item.title}
                  </span>
                </NavLink>
              );
            })}

          </nav>
        </div>

      </div>

      {/* Bottom Section */}

      <div className="border-t border-slate-800 px-6 py-5">

        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-500">
          Account
        </p>

        <nav className="space-y-2">

          {bottomItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.title}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-4 rounded-xl px-4 py-3 transition-all duration-200 ${
                    isActive
                      ? "bg-blue-600/20 text-cyan-400 border border-cyan-500/30"
                      : item.title === "Logout"
                      ? "text-red-400 hover:bg-red-500/10 hover:text-red-300"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`
                }
              >
                <Icon size={20} />

                <span className="font-medium">
                  {item.title}
                </span>
              </NavLink>
            );
          })}

        </nav>

      </div>

    </aside>
  );
}