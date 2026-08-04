import { CalendarDays, TrendingUp } from "lucide-react";
import Button from "../../ui/Button/Button";

export default function WelcomeBanner({
  name = "Investor",
  marketStatus = "Markets are looking steady today.",
  onAnalyze,
}) {
  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? "Good Morning"
      : hour < 18
      ? "Good Afternoon"
      : "Good Evening";

  const today = new Date().toLocaleDateString(undefined, {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-r from-slate-900 via-slate-900 to-blue-950 p-8">
      {/* Background Glow */}
      <div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-blue-500/10 blur-3xl" />

      <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        {/* Left */}
        <div className="space-y-4">
          <p className="text-sm font-medium uppercase tracking-widest text-blue-400">
            Welcome Back
          </p>

          <div>
            <h1 className="text-4xl font-bold text-white">
              {greeting}, {name} 👋
            </h1>

            <p className="mt-2 text-slate-400">
              Here's what's happening in today's market.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-sm text-slate-400">
            <div className="flex items-center gap-2">
              <CalendarDays size={18} />
              <span>{today}</span>
            </div>

            <div className="flex items-center gap-2">
              <TrendingUp size={18} className="text-green-400" />
              <span>{marketStatus}</span>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="flex shrink-0">
          <Button onClick={onAnalyze}>
            Analyze Company
          </Button>
        </div>
      </div>
    </div>
  );
}