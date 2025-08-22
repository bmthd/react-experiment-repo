"use client";

import { Tab, Tabs } from "@yamada-ui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { FC } from "react";

// アプリケーション内の既知のルート定数（型安全）
const ROUTES = {
  CSV: '/csv',
  CSV_CODE: '/csv/code',
  INQUIRY_CLIENT: '/inquiry/client',
  INQUIRY_CLIENT_CODE: '/inquiry/client/code',
  INQUIRY_DEPENDENT: '/inquiry/dependent',
  INQUIRY_DEPENDENT_CODE: '/inquiry/dependent/code',
  INQUIRY_PROTOTYPE: '/inquiry/prototype',
  INQUIRY_PROTOTYPE_CODE: '/inquiry/prototype/code',
  INQUIRY_SERVER: '/inquiry/server',
  INQUIRY_SERVER_CODE: '/inquiry/server/code',
  INQUIRY_RECURSIVE: '/inquiry/recursive',
} as const;

type ValidRoute = typeof ROUTES[keyof typeof ROUTES];

/**
 * 実装とソースコードのタブを提供するレイアウトコンポーネント
 */
export const TabLayout: FC = () => {
  const pathname = usePathname() as ValidRoute;
  
  // ルートマッピングによる型安全なタブ定義
  const getTabsForRoute = (currentPath: ValidRoute) => {
    switch (currentPath) {
      case ROUTES.CSV:
        return [
          { label: "実装", href: ROUTES.CSV },
          { label: "ソースコード", href: ROUTES.CSV_CODE },
        ];
      case ROUTES.CSV_CODE:
        return [
          { label: "実装", href: ROUTES.CSV },
          { label: "ソースコード", href: ROUTES.CSV_CODE },
        ];
      case ROUTES.INQUIRY_CLIENT:
        return [
          { label: "実装", href: ROUTES.INQUIRY_CLIENT },
          { label: "ソースコード", href: ROUTES.INQUIRY_CLIENT_CODE },
        ];
      case ROUTES.INQUIRY_CLIENT_CODE:
        return [
          { label: "実装", href: ROUTES.INQUIRY_CLIENT },
          { label: "ソースコード", href: ROUTES.INQUIRY_CLIENT_CODE },
        ];
      case ROUTES.INQUIRY_DEPENDENT:
        return [
          { label: "実装", href: ROUTES.INQUIRY_DEPENDENT },
          { label: "ソースコード", href: ROUTES.INQUIRY_DEPENDENT_CODE },
        ];
      case ROUTES.INQUIRY_DEPENDENT_CODE:
        return [
          { label: "実装", href: ROUTES.INQUIRY_DEPENDENT },
          { label: "ソースコード", href: ROUTES.INQUIRY_DEPENDENT_CODE },
        ];
      case ROUTES.INQUIRY_PROTOTYPE:
        return [
          { label: "実装", href: ROUTES.INQUIRY_PROTOTYPE },
          { label: "ソースコード", href: ROUTES.INQUIRY_PROTOTYPE_CODE },
        ];
      case ROUTES.INQUIRY_PROTOTYPE_CODE:
        return [
          { label: "実装", href: ROUTES.INQUIRY_PROTOTYPE },
          { label: "ソースコード", href: ROUTES.INQUIRY_PROTOTYPE_CODE },
        ];
      case ROUTES.INQUIRY_SERVER:
        return [
          { label: "実装", href: ROUTES.INQUIRY_SERVER },
          { label: "ソースコード", href: ROUTES.INQUIRY_SERVER_CODE },
        ];
      case ROUTES.INQUIRY_SERVER_CODE:
        return [
          { label: "実装", href: ROUTES.INQUIRY_SERVER },
          { label: "ソースコード", href: ROUTES.INQUIRY_SERVER_CODE },
        ];
      default:
        // フォールバック: 基本的なパターンマッチング
        if (pathname.endsWith('/code')) {
          const basePath = pathname.replace('/code', '') as ValidRoute;
          return [
            { label: "実装", href: basePath },
            { label: "ソースコード", href: pathname },
          ];
        }
        return [
          { label: "実装", href: pathname },
          { label: "ソースコード", href: `${pathname}/code` as ValidRoute },
        ];
    }
  };
  
  const tabs = getTabsForRoute(pathname);
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
