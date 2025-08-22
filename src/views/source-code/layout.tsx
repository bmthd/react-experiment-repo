"use client";

import { Tab, Tabs } from "@yamada-ui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Route } from "next";
import type { FC } from "react";

/**
 * 実装とソースコードのタブを提供するレイアウトコンポーネント
 * 
 * Note: usePathnameがRoute型を返さないのはNext.jsの仕様上の制限のため
 * TypedRoutesの恩恵を受けるためにasキャストを使用
 */
export const TabLayout: FC = () => {
  const pathname = usePathname();
  const basePath = pathname.replace(/\/code$/, "");
  
  // TypedRoutesを活用した型安全なタブ定義
  const tabs = [
    { label: "実装", href: basePath as Route },
    { label: "ソースコード", href: `${basePath}/code` as Route },
  ];
  
  const index = tabs.findIndex((tab) => tab.href === pathname);
  
  return (
    <Tabs index={index} fitted bg="white" roundedTop="md" mb="-8">
      {tabs.map((tab) => (
        <Tab as={Link} key={tab.href} href={tab.href}>
          {tab.label}
        </Tab>
      ))}
    </Tabs>
  );
};
