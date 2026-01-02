import { SidebarProvider } from "@/app/context/Sidebar";
import Usersidebar from "@/component/ClientComponents/Usersidebar";
import UserNavBar from "@/component/UserNavBar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="min-h-screen w-full flex">
        {/* Sidebar */}
        <aside className="md:w-64">
          {" "}
          <Usersidebar />
        </aside>

        {/* Right side: Navbar + Main content */}
        <div className="flex-1 flex flex-col">
          <UserNavBar />

          {/* Main content */}
          <main className="flex-1 py-2  px-4">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
