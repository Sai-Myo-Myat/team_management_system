import { User } from "lucide-react";
import { SidebarTrigger } from "./ui/sidebar";

const AppHeader = () => {
  return (
    <header className="flex items-center justify-between p-4 border-b-2">
      <SidebarTrigger size="lg" className="cursor-pointer" />
      <nav>
        <div className="flex items-center gap-4">
          <User />
        </div>
      </nav>
    </header>
  );
};
export default AppHeader;
