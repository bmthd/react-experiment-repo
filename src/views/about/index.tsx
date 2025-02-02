import { GithubIcon } from "@yamada-ui/lucide";
import { Card, Container, Heading, Link, Text } from "@yamada-ui/react";
import Image from "next/image";
import { FC, ReactNode } from "react";

const lines = [
  <>
    このサイトは私<Link href="https://x.com/j_ktwr">@j_ktwr</Link>
    の技術検証用サンプル置き場です。
  </>,
  "ZennやLTなどの解説用サンプルを配置していく予定です。",
  <>
    <Image src="https://static.zenn.studio/images/logo.png" height="20" width="100" alt="Zenn" />
    <Link href="https://zenn.dev/bmth">Zenn</Link>
  </>,
  <>
    <GithubIcon />
    <Link href="https://github.com/bmthd/react-experiment-repo">このサイトのリポジトリ</Link>
  </>,
] as const satisfies ReactNode[];

export const AboutPage: FC = () => {
  return (
    <Container as={Card}>
      <Heading>このサイトについて</Heading>
      {lines.map((line, i) => (
        <Text key={i}>{line}</Text>
      ))}
    </Container>
  );
};
