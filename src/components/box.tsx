import { cn } from "@/lib/utils";
import React from "react";

const Box: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={cn("bg-accent overflow-hidden rounded-md p-4", className)}
      {...props}
    >
      {children}
    </div>
  );
};

export default Box;
