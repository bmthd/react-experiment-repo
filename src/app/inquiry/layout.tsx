import { ConformMenu } from "@/views/conform/layout";
import { ReactNode } from "react";

export default ({ children }: { children: ReactNode }) => {
  return (
    <>
      <ConformMenu />
      {children}
    </>
  );
};
