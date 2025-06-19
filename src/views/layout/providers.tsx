"use client";

import { configureValidationSettings } from "@/lib/validation";
import theme from "@/theme";
import { UIProvider } from "@yamada-ui/react";
import type { FC, ReactNode } from "react";

export const Providers: FC<{ children: ReactNode }> = ({ children }) => {
  configureValidationSettings();
  return <UIProvider theme={theme}>{children}</UIProvider>;
};
