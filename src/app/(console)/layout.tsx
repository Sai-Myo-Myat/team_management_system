import AppHeader from "@/components/app-header";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full min-h-screen overflow-hidden border">
        <AppHeader />
        <div className="p-4">{children}</div>
      </main>
    </SidebarProvider>
  );
}
