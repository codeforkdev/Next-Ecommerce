"use client";
import { createContext, useState } from "react";

export const DropdownContext = createContext({ open: false });

export const Root = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);

  return (
    <DropdownContext.Provider value={{ open }}>
      {children}
    </DropdownContext.Provider>
  );
};
