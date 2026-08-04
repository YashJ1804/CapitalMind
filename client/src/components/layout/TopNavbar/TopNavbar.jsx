import { Search, Bell, UserCircle } from "lucide-react";

export default function TopNavbar() {
  return (
    <header className="sticky top-0 z-20 flex h-20 items-center justify-between border-b border-slate-800 bg-slate-950/90 px-8 backdrop-blur-md">
      {/* Left Section */}
      <div>
        <h1 className="text-2xl font-bold text-white">
          Dashboard
        </h1>

        <p className="mt-1 text-sm text-slate-400">
          Welcome back! Here's what's happening today.
        </p>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="hidden md:flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-900 px-4 py-2">
          <Search size={18} className="text-slate-400" />

          <input
            type="text"
            placeholder="Search company..."
            className="w-56 bg-transparent text-sm text-white placeholder:text-slate-500 focus:outline-none"
          />
        </div>

        {/* Notification */}
        <button className="rounded-xl border border-slate-700 bg-slate-900 p-3 text-slate-300 transition hover:border-cyan-500 hover:text-white">
          <Bell size={20} />
        </button>

        {/* User */}
        <button className="flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 transition hover:border-cyan-500">
          <UserCircle size={28} className="text-cyan-400" />

          <div className="hidden text-left lg:block">
            <p className="text-sm font-medium text-white">
              Welcome
            </p>

            <p className="text-xs text-slate-400">
              Investor
            </p>
          </div>
        </button>
      </div>
    </header>
  );
}