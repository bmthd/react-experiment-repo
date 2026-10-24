"use client";

import { Tabs } from "@yamada-ui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { FC } from "react";

/**
 * 実装とソースコードのタブを提供するレイアウトコンポーネント
 */
export const TabLayout: FC = () => {
  const pathname = usePathname();
  const basePath = pathname.replace(/\/code$/, "");
  const tabs = [
    { label: "実装", href: basePath },
    { label: "ソースコード", href: `${basePath}/code` },
  ];
  const index = tabs.findIndex((tab) => tab.href === pathname);
  return (
    <Tabs.Root index={index} fitted bg="white" roundedTop="md" mb="-8">
      <Tabs.List>
        {tabs.map((tab, i) => (
          <Tabs.Tab asChild index={i} key={tab.href}>
            <Link href={tab.href}>{tab.label}</Link>
          </Tabs.Tab>
        ))}
      </Tabs.List>
    </Tabs.Root>
  );
};
