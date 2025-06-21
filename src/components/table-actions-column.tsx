import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Row } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { ReactNode } from "react";
import { Button } from "./ui/button";

interface TableRowActionsProps<TData> {
  row: Row<TData>;
  renderMenuItems: (row: Row<TData>) => ReactNode;
  className?: string;
}

export default function ActionColumn<TData>({
  row,
  className,
  renderMenuItems,
}: TableRowActionsProps<TData>) {
  return (
    <div className="flex justify-end">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size="icon"
            variant="ghost"
            className="data-[state=open]:bg-muted flex h-fit w-fit p-1 hover:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
          >
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">Open actions</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className={cn("w-[200px] space-y-1", className)}
        >
          {renderMenuItems(row)}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
