"use client";
import { ChevronDownIcon } from "@yamada-ui/lucide";
import { Button, Menu, MenuButton, MenuItem, MenuList } from "@yamada-ui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";

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
    <Menu>
      <MenuButton as={Button} endIcon={<ChevronDownIcon />} colorScheme="gray" w="16rem">
        {links.find(({ href }) => href === pathname)?.label ?? "選択"}
      </MenuButton>
      <MenuList>
        {links.map(({ label, href }) => (
          <Link key={href} href={href}>
            <MenuItem>{label}</MenuItem>
          </Link>
        ))}
      </MenuList>
    </Menu>
  );
};
