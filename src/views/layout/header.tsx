import { Heading, HStack } from "@yamada-ui/react";
import Link from "next/link";
import type { FC } from "react";

export const Header: FC = () => {
  return (
    <HStack as="header" bg="white" p={4}>
      <Link href="/">
        <Heading>技術検証用サンプルサイト</Heading>
      </Link>
    </HStack>
  );
};
