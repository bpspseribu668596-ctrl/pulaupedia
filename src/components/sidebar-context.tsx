"use client";

import { createContext, useContext, useState, useCallback } from "react";

interface SidebarContextValue {
  open: boolean;
  toggle: () => void;
  setOpen: (v: boolean) => void;
}

const SidebarContext = createContext<SidebarContextValue>({
  open: true,
  toggle: () => {},
  setOpen: () => {},
});

export function SidebarStateProvider({
  children,
  defaultOpen = true,
}: {
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpenState] = useState(defaultOpen);

  const toggle = useCallback(() => setOpenState((v) => !v), []);
  const setOpen = useCallback((v: boolean) => setOpenState(v), []);

  return (
    <SidebarContext.Provider value={{ open, toggle, setOpen }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebarState() {
  return useContext(SidebarContext);
}
