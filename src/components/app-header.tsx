"use client";
import { UserCircle } from "lucide-react";
import { SidebarTrigger } from "./ui/sidebar";
import { useAuth } from "@/context/auth-context";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCallback } from "react";
import { useRouter } from "next/navigation";

const AppHeader = () => {
  const auth = useAuth();
  const router = useRouter();
  const onLogout = useCallback(() => {
    auth.logout();
    router.replace("/login");
  }, [auth, router]);
  return (
    <header className="flex items-center justify-between p-4 border-b-2">
      <SidebarTrigger size="lg" className="cursor-pointer" />
      <nav>
        <DropdownMenu>
          <DropdownMenuTrigger className="cursor-pointer">
            <div className="flex items-center gap-2">
              <UserCircle />
              <h3>{auth.user?.username}</h3>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={onLogout}
              className="text-destructive font-semibold cursor-pointer"
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
    </header>
  );
};
export default AppHeader;
