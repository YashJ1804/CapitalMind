import AppLayout from "../layouts/AppLayout";

export default function Settings() {
  return (
    <AppLayout>
      <div className="flex h-full flex-col items-center justify-center text-center">
        <div className="text-7xl">⚙️</div>

        <h1 className="mt-6 text-4xl font-bold text-white">
          Settings
        </h1>

        <p className="mt-3 max-w-md text-slate-400">
          Application settings will be available in a future sprint.
        </p>
      </div>
    </AppLayout>
  );
}