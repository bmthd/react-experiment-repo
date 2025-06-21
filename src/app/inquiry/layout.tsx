import { ConformMenu } from "@/views/conform/layout";
import type { ReactNode } from "react";

export default ({ children }: { children: ReactNode }) => {
  return (
    <>
      <ConformMenu />
      {children}
    </>
  );
};
