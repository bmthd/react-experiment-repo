import { Card, Container, Heading, Text, VStack } from "@yamada-ui/react";
import { FC } from "react";
import { InquiryForm } from "./inquiry-form";

export const InquiryPage: FC = () => {
  return (
    <Container as={Card}>
      <Heading>お問い合わせ</Heading>
      <VStack>
        <Text>こちらでは当サイトに関するお問い合わせを受け付けています。</Text>
        <Text>機能追加要望、不具合情報などありましたらお気軽にお送りください。</Text>
        <Text>個人開発のため、返答にお時間を頂く場合がありますので予めご了承ください。</Text>
      </VStack>
      <InquiryForm />
    </Container>
  );
};
