import { Container, Heading } from "@yamada-ui/react";
import Link from "next/link";
import { FC } from "react";

export const Header: FC = () => {
  return (
    <Container as="header" bg="white">
      <Link href="/">
        <Heading variant="h1">Header</Heading>
      </Link>
    </Container>
  );
};
