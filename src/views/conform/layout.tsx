"use client";
import { Button, ChevronDownIcon, Menu } from "@yamada-ui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { FC } from "react";

type LinkItem = {
  label: string;
  href: string;
};

const links = [
  { label: "サーバー", href: "/inquiry/server" },
  { label: "クライアント", href: "/inquiry/client" },
  { label: "プロトタイピング", href: "/inquiry/prototype" },
  { label: "依存関係のあるフォーム", href: "/inquiry/dependent" },
  { label: "再帰的なフォーム", href: "/inquiry/recursive" },
] as const satisfies LinkItem[];

export const ConformMenu: FC = () => {
  const pathname = usePathname();
  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <Button endIcon={<ChevronDownIcon />} colorScheme="gray" w="16rem">
          {links.find(({ href }) => href === pathname)?.label ?? "選択"}
        </Button>
      </Menu.Trigger>
      <Menu.Content>
        {links.map(({ label, href }) => (
          <Menu.Item as={Link} key={href} href={href}>
            {label}
          </Menu.Item>
        ))}
      </Menu.Content>
    </Menu.Root>
  );
};
