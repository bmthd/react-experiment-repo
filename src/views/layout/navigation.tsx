"use client";

import { Tab, Tabs } from "@yamada-ui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";

type LinkItem = {
  label: string;
  href: string;
};

const links = [
  { label: "お問い合わせフォームの例", href: "/inquiry" },
  { label: "このサイトは？", href: "/about" },
] as const satisfies LinkItem[];

export const Navigation: FC = () => {
  const pathname = usePathname();
  const index = links.findIndex(({ href }) => href === pathname);
  return (
    <Tabs index={index} bg="gray.100">
      {links.map(({ label, href }) => (
        <Tab as={Link} key={href} href={href}>
          {label}
        </Tab>
      ))}
    </Tabs>
  );
};
