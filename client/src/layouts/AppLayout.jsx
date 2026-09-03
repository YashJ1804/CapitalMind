import { useState } from "react";
import { Menu } from "lucide-react";

import Sidebar from "../components/layout/Sidebar/Sidebar";
import TopNavbar from "../components/layout/TopNavbar/TopNavbar";
import PageContainer from "../components/layout/PageContainer/PageContainer";

export default function AppLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-slate-950 text-white">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Mobile Header */}
        <div className="flex h-14 shrink-0 items-center border-b border-slate-800 bg-slate-950 px-4 lg:hidden">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-300 transition hover:bg-slate-800 hover:text-white"
            aria-label="Open navigation"
          >
            <Menu size={22} />
          </button>

          <div className="ml-3 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-cyan-400 text-sm">
              📈
            </div>

            <span className="text-lg font-bold text-white">
              CapitalMind
            </span>
          </div>
        </div>

        <TopNavbar />

        <main className="min-h-0 min-w-0 flex-1 overflow-y-auto">
          <PageContainer>
            {children}
          </PageContainer>
        </main>
      </div>
    </div>
  );
}