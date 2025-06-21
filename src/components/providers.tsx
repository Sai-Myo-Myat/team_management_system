"use client";

import { AuthProvider } from "@/context/auth-context";
import { ModalProvider } from "@/context/modal-context";
import { PropsWithChildren } from "react";
import ModalManager from "./modals/modal-manager";

const Providers = ({ children }: PropsWithChildren) => {
  return (
    <div>
      <AuthProvider>
        <ModalProvider>
          {children}
          <ModalManager />
        </ModalProvider>
      </AuthProvider>
    </div>
  );
};

export default Providers;
