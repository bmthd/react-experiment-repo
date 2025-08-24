import { configureValidationSettings } from "@/lib/validation";
import { env } from "@/utils/env";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/next";
import { Container, Separator } from "@yamada-ui/react";
import type { FC, ReactNode } from "react";
import { Header } from "./header";
import { Navigation } from "./navigation";
import { Providers } from "./providers";

export const LayoutPage: FC<{ children: ReactNode }> = ({ children }) => {
  configureValidationSettings();
  return (
    <Providers>
      <Analytics />
      <GoogleAnalytics gaId={env.NEXT_PUBLIC_GA_ID} />
      <Header />
      <Separator />
      <Navigation />
      <Separator />
      <Container>{children}</Container>
    </Providers>
  );
};
