"use client";

import { Tabs } from "@yamada-ui/react";
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
    <Tabs.Root index={index} bg="gray.100">
      <Tabs.List>
        {links.map(({ label, href }, i) => (
          <Tabs.Tab asChild index={i} key={href}>
            <Link href={href}>{label}</Link>
          </Tabs.Tab>
        ))}
      </Tabs.List>
    </Tabs.Root>
  );
};
