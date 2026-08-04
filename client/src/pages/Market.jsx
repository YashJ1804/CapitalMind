import AppLayout from "../layouts/AppLayout";

export default function Market() {
  return (
    <AppLayout>
      <div className="flex h-full flex-col items-center justify-center text-center">
        <div className="text-7xl">📈</div>

        <h1 className="mt-6 text-4xl font-bold text-white">
          Market
        </h1>

        <p className="mt-3 max-w-md text-slate-400">
          Live market overview and TradingView integration will be added in Sprint 3.
        </p>
      </div>
    </AppLayout>
  );
}