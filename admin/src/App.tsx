import { Outlet } from "react-router";
import Navbar from "./components/common/Navbar";
import Sidebar from "./components/dashboard/Sidebar";
import CommonLayout from "./layout/CommonLayout";
import { cn } from "./lib/utils";

function App() {
  return (
    <CommonLayout>
      <div className="h-screen flex bg-background">
        <Sidebar />
        <div
          className={cn(
            "flex flex-1 flex-col max-w-[--breakpoint-2xl] hoverEffect ml-64"
          )}
        >
          <Navbar />
          <main>
            <Outlet />
          </main>
        </div>
      </div>
    </CommonLayout>
  );
}

export default App;
