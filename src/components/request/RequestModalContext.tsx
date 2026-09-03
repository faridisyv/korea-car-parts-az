"use client";

import React, { createContext, useContext, useState } from "react";

export interface RequestModalPrefill {
  partNumber?: string;
  partName?: string;
  carModel?: string;
  carYear?: number;
}

interface RequestModalContextType {
  isOpen: boolean;
  prefill: RequestModalPrefill;
  openRequestModal: (data?: RequestModalPrefill) => void;
  closeRequestModal: () => void;
}

const RequestModalContext = createContext<RequestModalContextType>({
  isOpen: false,
  prefill: {},
  openRequestModal: () => {},
  closeRequestModal: () => {},
});

export function RequestModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [prefill, setPrefill] = useState<RequestModalPrefill>({});

  const openRequestModal = (data?: RequestModalPrefill) => {
    setPrefill(data || {});
    setIsOpen(true);
  };

  const closeRequestModal = () => {
    setIsOpen(false);
    setPrefill({});
  };

  return (
    <RequestModalContext.Provider
      value={{
        isOpen,
        prefill,
        openRequestModal,
        closeRequestModal,
      }}
    >
      {children}
    </RequestModalContext.Provider>
  );
}

export function useRequestModal() {
  return useContext(RequestModalContext);
}
