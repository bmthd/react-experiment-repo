"use client";

import { configureValidationSettings } from "@/lib/validation";
import theme from "@/theme";
import { ComponentPropsProvider } from "@/theme/component-props";
import { UIProvider } from "@yamada-ui/react";
import type { FC, ReactNode } from "react";

export const Providers: FC<{ children: ReactNode }> = ({ children }) => {
  configureValidationSettings();
  return (
    <UIProvider theme={theme}>
      <ComponentPropsProvider>{children}</ComponentPropsProvider>
    </UIProvider>
  );
};
