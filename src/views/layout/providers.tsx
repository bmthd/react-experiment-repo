"use client";

import { setConfig } from "@/lib/validation";
import theme from "@/theme";
import { UIProvider } from "@yamada-ui/react";
import { FC, ReactNode } from "react";

export const Providers: FC<{ children: ReactNode }> = ({ children }) => {
  setConfig();
  return <UIProvider theme={theme}>{children}</UIProvider>;
};
