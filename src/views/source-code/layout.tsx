"use client";

import { Tab, Tabs } from "@yamada-ui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Route } from "next";
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
    <Tabs index={index} fitted bg="white" roundedTop="md" mb="-8">
      {tabs.map((tab) => (
        <Tab as={Link} key={tab.href} href={tab.href as Route}>
          {tab.label}
        </Tab>
      ))}
    </Tabs>
  );
};
