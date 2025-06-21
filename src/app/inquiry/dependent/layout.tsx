import { TabLayout } from "@/views/source-code/layout";
import type { ReactNode } from "react";

export default ({ children }: { children: ReactNode }) => {
  return (
    <>
      <TabLayout />
      {children}
    </>
  );
};
