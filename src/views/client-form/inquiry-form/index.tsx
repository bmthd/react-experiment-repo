"use client";
import { Form, TextareaField, TextField } from "@/ui/form";
import FormDebug from "@/ui/form/debug";
import { parseWithValibot } from "@conform-to/valibot";
import { Button, HStack, VStack } from "@yamada-ui/react";
import { FC, MouseEventHandler, useCallback } from "react";
import { inquiryFormSchema } from "../schema";

export const InquiryForm: FC = () => {
  const handleSend = useCallback<MouseEventHandler<HTMLButtonElement>>(async (event) => {
    const { form } = event.currentTarget;
    if (!form) return;
    const formData = new FormData(form);
    const data = parseWithValibot(formData, { schema: inquiryFormSchema });
    if (data.status !== "success") {
      console.error(data.reply());
      return;
    }
    console.log(data.value);
  }, []);

  return (
    <Form schema={inquiryFormSchema}>
      {({ form, field }) => (
        <VStack>
          <TextField name={field.name.name} label="お名前" autoComplete="name" />
          <TextField name={field.email.name} label="メールアドレス" autoComplete="email" />
          <TextareaField name={field.message.name} label="お問い合わせ内容" />
          <HStack alignSelf="end">
            <Button
              type="button"
              onClick={(e) => {
                form.validate();
                handleSend(e);
              }}
            >
              送信
            </Button>
          </HStack>
          <FormDebug />
        </VStack>
      )}
    </Form>
  );
};
