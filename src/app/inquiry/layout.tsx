"use client";

import { Link, Tab, Tabs } from "@yamada-ui/react";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

type LinkItem = {
  label: string;
  href: string;
};

const links = [
  { label: "サーバー", href: "/inquiry/server" },
  { label: "クライアント", href: "/inquiry/client" },
] as const satisfies LinkItem[];

export default ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const index = links.findIndex(({ href }) => href === pathname);
  return (
    <>
      <Tabs index={index} variant="rounded-solid">
        {links.map(({ label, href }) => (
          <Tab as={Link} key={href} href={href}>
            {label}
          </Tab>
        ))}
      </Tabs>
      {children}
    </>
  );
};
