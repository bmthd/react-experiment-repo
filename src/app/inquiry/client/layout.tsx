import { TabLayout } from "@/views/source-code/layout";
import { ReactNode } from "react";

export default ({ children }: { children: ReactNode }) => {
  return (
    <>
      <TabLayout />
      {children}
    </>
  );
};
