import { Card, Container, Heading, Link, Text, VStack } from "@yamada-ui/react";
import type { FC } from "react";
import { InquiryForm } from "./inquiry-form";

export const ClientFormPage: FC = () => {
  return (
    <Container as={Card} roundedTop={0}>
      <Heading>お問い合わせ</Heading>
      <VStack>
        <Text>こちらでは当サイトに関するお問い合わせを受け付けています。</Text>
        <Text>機能追加要望、不具合情報などありましたらお気軽にお送りください。</Text>
        <Text>個人開発のため、返答にお時間を頂く場合がありますので予めご了承ください。</Text>
      </VStack>
      <InquiryForm />
      <Link
        external
        href="https://github.com/bmthd/react-experiment-repo/blob/master/src/views/client-form/inquiry-form/index.tsx"
      >
        コード
      </Link>
    </Container>
  );
};
