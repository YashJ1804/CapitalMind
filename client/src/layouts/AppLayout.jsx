import Sidebar from "../components/layout/Sidebar/Sidebar";
import TopNavbar from "../components/layout/TopNavbar/TopNavbar";
import PageContainer from "../components/layout/PageContainer/PageContainer";

export default function AppLayout({ children }) {
  return (
    <div className="flex h-screen overflow-hidden bg-slate-950 text-white">

      {/* Sidebar */}
      <Sidebar />

      {/* Right Section */}
      <div className="flex flex-1 flex-col">

        {/* Top Navigation */}
        <TopNavbar />

        {/* Main Page */}
        <PageContainer>
          {children}
        </PageContainer>

      </div>

    </div>
  );
}