"use client";

import { AuthProvider } from "@/context/auth-context";
import { PropsWithChildren } from "react";

const Providers = ({ children }: PropsWithChildren) => {
  return (
    <div>
      <AuthProvider>{children}</AuthProvider>
    </div>
  );
};

export default Providers;
