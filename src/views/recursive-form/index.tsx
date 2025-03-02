"use client";

import {
  AddArrayItemButton,
  FieldArray,
  Form,
  RadioGroupField,
  ResetButton,
  TextField,
} from "@/ui/form";
import FormDebug from "@/ui/form/debug";
import { ConformFieldset } from "@/ui/form/fieldset";
import { FieldMetadata } from "@conform-to/react";
import {
  CheckIcon,
  CircleIcon,
  CopyIcon,
  EqualIcon,
  EqualNotIcon,
  TrashIcon,
  UsersIcon,
} from "@yamada-ui/lucide";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Container,
  Heading,
  HStack,
  Icon,
  IconButton,
} from "@yamada-ui/react";
import { FC } from "react";
import * as v from "valibot";

type Ruleset = {
  condition: "and" | "or";
  rules: {
    subject: string;
    operator: "eq" | "ne";
    object: string;
  }[];
  nested: Ruleset[];
};

const rulesetSchema: v.GenericSchema<Ruleset> = v.object({
  condition: v.union([v.literal("and"), v.literal("or")]),
  rules: v.array(
    v.object({
      subject: v.nonOptional(v.string()),
      operator: v.union([v.literal("eq"), v.literal("ne")]),
      object: v.nonOptional(v.string()),
    }),
  ),
  nested: v.array(v.lazy(() => rulesetSchema)),
});

const defaultValue: Partial<Ruleset> = {
  condition: "and",
  rules: [{ subject: "", operator: "eq", object: "" }],
  nested: [],
};

const RulesetField: FC<{ field: ReturnType<FieldMetadata<Ruleset>["getFieldset"]> }> = ({
  field,
}) => {
  return (
    <Card>
      <CardHeader>
        <RadioGroupField
          name={field.condition.name}
          label="条件"
          items={[
            { value: "and", label: "AND" },
            { value: "or", label: "OR" },
          ]}
          render={({ label, checked }) => (
            <Button
              as="div"
              variant={checked ? "solid" : "ghost"}
              colorScheme={checked ? "blackAlpha" : "gray"}
              startIcon={checked ? <CheckIcon /> : <Icon />}
            >
              {label}
            </Button>
          )}
        />
      </CardHeader>
      <CardBody>
        <FieldArray field={field.rules}>
          {({ field, remove, copy }) => (
            <ConformFieldset key={field.key} field={field}>
              {(field) => (
                <HStack alignItems="start">
                  <TextField name={field.subject.name} />
                  <RadioGroupField
                    name={field.operator.name}
                    items={[
                      { value: "eq", label: <EqualIcon /> },
                      { value: "ne", label: <EqualNotIcon /> },
                    ]}
                    render={({ label, checked }) => (
                      <Button
                        as="div"
                        variant={checked ? "solid" : "ghost"}
                        colorScheme={checked ? "blackAlpha" : "gray"}
                        startIcon={checked ? <CheckIcon /> : <Icon />}
                      >
                        {label}
                      </Button>
                    )}
                  />
                  <TextField name={field.object.name} />
                  <IconButton
                    onClick={copy}
                    icon={<CopyIcon />}
                    aria-label="複製"
                    variant="ghost"
                  />
                  <IconButton
                    onClick={remove}
                    icon={<TrashIcon />}
                    aria-label="削除"
                    variant="ghost"
                  />
                </HStack>
              )}
            </ConformFieldset>
          )}
        </FieldArray>
        <AddArrayItemButton
          field={field.rules}
          defaultValue={{ operator: "eq" }}
          variant="ghost"
          startIcon={<UsersIcon />}
        >
          条件を追加
        </AddArrayItemButton>
        <FieldArray field={field.nested}>
          {({ field, copy, remove }) => (
            <HStack key={field.key} alignItems="start">
              <ConformFieldset field={field}>
                {(field) => <RulesetField field={field} />}
              </ConformFieldset>
              <IconButton onClick={copy} icon={<CopyIcon />} aria-label="複製" variant="ghost" />
              <IconButton onClick={remove} icon={<TrashIcon />} aria-label="削除" variant="ghost" />
            </HStack>
          )}
        </FieldArray>
        <AddArrayItemButton
          field={field.nested}
          defaultValue={{
            condition: "and",
            rules: [{ subject: "", operator: "eq", object: "" }],
            nested: [],
          }}
          variant="ghost"
          startIcon={<CircleIcon />}
        >
          条件グループを追加
        </AddArrayItemButton>
      </CardBody>
    </Card>
  );
};

export const RecursiveForm: FC = () => {
  return (
    <Container>
      <Heading>再帰的なフォーム</Heading>
      <Form schema={rulesetSchema} options={{ defaultValue }}>
        {({ field }) => (
          <>
            <RulesetField field={field} />
            <Button type="submit">送信</Button>
            <ResetButton />
            <FormDebug />
          </>
        )}
      </Form>
    </Container>
  );
};
