"use client";
import { Tab, Tabs } from "@yamada-ui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

type LinkItem = {
  label: string;
  href: string;
};

const links = [
  { label: "サーバー", href: "/inquiry/server" },
  { label: "クライアント", href: "/inquiry/client" },
  { label: "プロトタイピング", href: "/inquiry/prototype" },
  { label: "依存関係のあるフォーム", href: "/inquiry/dependent" },
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
