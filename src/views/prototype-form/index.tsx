import { Form, TextareaField, TextField } from "@/ui/form";
import { Button, Card, Container, Heading, HStack, Link, Text, VStack } from "@yamada-ui/react";
import type { FC } from "react";

export const PrototypeFormPage: FC = () => {
  return (
    <Container as={Card} roundedTop={0}>
      <Heading>お問い合わせ</Heading>
      <VStack>
        <Text>こちらでは当サイトに関するお問い合わせを受け付けています。</Text>
        <Text>機能追加要望、不具合情報などありましたらお気軽にお送りください。</Text>
        <Text>個人開発のため、返答にお時間を頂く場合がありますので予めご了承ください。</Text>
      </VStack>
      <Form>
        <VStack>
          <TextField label="お名前" autoComplete="name" />
          <TextField label="メールアドレス" autoComplete="email" />
          <TextareaField label="お問い合わせ内容" />
          <HStack alignSelf="end">
            <Button type="submit">送信</Button>
          </HStack>
        </VStack>
      </Form>
      <Link
        external
        href="https://github.com/bmthd/react-experiment-repo/blob/master/src/views/prototype-form/index.tsx"
      >
        コード
      </Link>
    </Container>
  );
};
