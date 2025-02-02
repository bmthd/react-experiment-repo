import { setConfig } from "@/lib/validation";
import { Container, Separator } from "@yamada-ui/react";
import { FC, ReactNode } from "react";
import { Header } from "./header";
import { Navigation } from "./navigation";
import { Providers } from "./providers";

export const LayoutPage: FC<{ children: ReactNode }> = ({ children }) => {
  setConfig();
  return (
    <Providers>
      <Header />
      <Separator />
      <Navigation />
      <Separator />
      <Container>{children}</Container>
    </Providers>
  );
};
