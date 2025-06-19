"use client";

import { Tab, Tabs } from "@yamada-ui/react";
import Link from "next/link";
import { usePathname, useSelectedLayoutSegment } from "next/navigation";
import type { FC } from "react";

type LinkItem = {
  label: string;
  href: string;
};

const links = [
  { label: "このサイトは？", href: "/" },
  { label: "お問い合わせフォームの例", href: "/inquiry" },
  { label: "CSVデータを型安全に扱う", href: "/csv" },
] as const satisfies LinkItem[];

export const Navigation: FC = () => {
  const pathname = usePathname();
  const segment = useSelectedLayoutSegment();
  const index = links.findIndex(({ href }) => href === pathname || href.includes(`${segment}`));
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
