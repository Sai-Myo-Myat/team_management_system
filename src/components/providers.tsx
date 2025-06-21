"use client";

import { AuthProvider } from "@/context/auth-context";
import { ModalProvider } from "@/context/modal-context";
import { PropsWithChildren } from "react";
import ModalManager from "./modals/modal-manager";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const Providers = ({ children }: PropsWithChildren) => {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ModalProvider>
            {children}
            <ModalManager />
          </ModalProvider>
        </AuthProvider>
      </QueryClientProvider>
    </div>
  );
};

export default Providers;
