export default function PageContainer({ children }) {
  return (
    <main
      className="
        flex-1
        overflow-y-auto
        bg-slate-950
        px-8
        py-8
      "
    >
      <div className="mx-auto w-full max-w-7xl">
        {children}
      </div>
    </main>
  );
}